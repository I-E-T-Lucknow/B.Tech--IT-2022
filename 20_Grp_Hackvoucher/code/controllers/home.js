module.exports.createsession = (req , res) => {
    console.log(req.body) ;
    return res.redirect('/home') ;
} ;