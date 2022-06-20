const express = require('express') ;
const cookieParser = require('cookie-parser') ;
const port = process.env.PORT || 3000;
const app = express() ;
const qs = require("querystring");

const checksum_lib = require("./Paytm/checksum");
const config = require("./Paytm/config");

const routes = require('./routes/home') ;
app.use(express.urlencoded()) ;
app.use(cookieParser()) ; 
app.use(express.static('assets'))
const multer = require('multer');
const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

const db = require('./config/mongoose') ;

const session = require('express-session') ;
const passport = require('passport') ;
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo') ;
const flash = require('connect-flash') ;
const customWere = require('./config/middlewere');
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, '/src/my-images');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname);
    }
  });

app.set('view engine' , 'ejs') ;
app.set('views' , './views') ;

app.use(session({
    name : 'codeiel',
    secret :'blahsomething',
    saveUninitialized :false ,
    resave :false ,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://nisaar:Nidsar@cluster0.ztmue.mongodb.net/Hackvoucher_collection?retryWrites=true&w=majority',
        collectionName:'sessions' // See below for details
      })
    
})) ;
app.use(passport.initialize()) ;
app.use(passport.session()) ; 

app.use(passport.setAuthenticatedUser) ;
app.use(flash()) ;
app.use(customWere.setFlash);
app.get("/wallet", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/paynow", [parseUrl, parseJson], (req, res) => {
  // Route for making payment

  var paymentDetails = {
    amount: req.body.amount,
    customerId: req.body.name,
    customerEmail: req.body.email,
    customerPhone: req.body.phone
}
if(!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone) {
    res.status(400).send('Payment failed')
} else {
    var params = {};
    params['MID'] = config.PaytmConfig.mid;
    params['WEBSITE'] = config.PaytmConfig.website;
    params['CHANNEL_ID'] = 'WEB';
    params['INDUSTRY_TYPE_ID'] = 'Retail';
    params['ORDER_ID'] = 'TEST_'  + new Date().getTime();
    params['CUST_ID'] = paymentDetails.customerId;
    params['TXN_AMOUNT'] = paymentDetails.amount;
    params['CALLBACK_URL'] = 'http://localhost:3000/callback';
    params['EMAIL'] = paymentDetails.customerEmail;
    params['MOBILE_NO'] = paymentDetails.customerPhone;


    checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
        var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
        // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

        var form_fields = "";
        for (var x in params) {
            form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
        }
        form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
        res.end();
    });
}
});
app.post("/callback", (req, res) => {
  // Route for verifiying payment

  var body = '';

  req.on('data', function (data) {
     body += data;
  });

   req.on('end', function () {
     var html = "";
     var post_data = qs.parse(body);

     // received params in callback
     console.log('Callback Response: ', post_data, "\n");


     // verify the checksum
     var checksumhash = post_data.CHECKSUMHASH;
     // delete post_data.CHECKSUMHASH;
     var result = checksum_lib.verifychecksum(post_data, config.PaytmConfig.key, checksumhash);
     console.log("Checksum Result => ", result, "\n");


     // Send Server-to-Server request to verify Order Status
     var params = {"MID": config.PaytmConfig.mid, "ORDERID": post_data.ORDERID};

     checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {

       params.CHECKSUMHASH = checksum;
       post_data = 'JsonData='+JSON.stringify(params);

       var options = {
         hostname: 'securegw-stage.paytm.in', // for staging
         // hostname: 'securegw.paytm.in', // for production
         port: 443,
         path: '/merchant-status/getTxnStatus',
         method: 'POST',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': post_data.length
         }
       };


       // Set up the request
       var response = "";
       var post_req = https.request(options, function(post_res) {
         post_res.on('data', function (chunk) {
           response += chunk;
         });

         post_res.on('end', function(){
           console.log('S2S Response: ', response, "\n");

           var _result = JSON.parse(response);
             if(_result.STATUS == 'TXN_SUCCESS') {
                 res.send('payment sucess')
             }else {
                 res.send('payment failed')
             }
           });
       });

       // post the data
       post_req.write(post_data);
       post_req.end();
      });
     });
});

app.use('/' , require('./routes/home')) ;
app.use('/' , require('./routes/coupon')) ;
app.listen(port , (err) =>{
    if(err) {
        console.log('Error at liten') ;
    }
}) ;
