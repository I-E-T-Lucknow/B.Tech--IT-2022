const express = require('express')
const app = express()
const router = express.Router()
const timetable = require('../models/timetable');
const branchsem = require('../models/branchsem');
const auth = require('../auth/auth.js')

let days = ["No day",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let timings = ["No Timing",
    "9:10 AM to 10:00 AM",
    "10:00 AM to 10:50 AM",
    "10:50 AM to 11:40 AM",
    "11:40 AM to 12:30 PM",
    "2:00 PM to 2:50 PM",
    "2:50 PM to 3:40 PM",
    "3:40 PM to 4:30 PM"
];

router.get('/',auth,async(req,res)=>{
  let loginUser = req.user;
  console.log(loginUser);
  if (loginUser.category === 'student') {
    let branchsemobj = await branchsem.findById(loginUser.branchsem);
    console.log(branchsemobj.timetable);
    res.redirect('/timetable/id/'+ branchsemobj.timetable);
    // res.render('table.ejs', {user: loginUser, });
  } else {
      let branchsemobj = await branchsem.findOne();
      res.redirect('/timetable/id/'+ branchsemobj.timetable);
  }
});

router.get('/id/:timetableid', auth, async(req, res) => {
    let loginUser = req.user;
    let timetableobj = await timetable.findById(req.params.timetableid);
    console.log(timetableobj);
    let branchsemArr;
    if (loginUser.category === 'faculty') {
        branchsemArr = await branchsem.find();
        console.log(branchsemArr)
    }
    // console.log(loginUser);
    res.render('table.ejs', {user: loginUser, timetable: timetableobj, branchsemList: branchsemArr});
});

router.post('/id/:timetableid', auth, async (req, res) => {
    const {day, timing, subject} = req.body;
    const dayz = days.indexOf(day);
    const timingz = timings.indexOf(timing);
    console.log(req.body);
  let loginUser = req.user;
  let timetableobj = await timetable.findById(req.params.timetableid);
  console.log(timetableobj);
  console.log(dayz, timingz);
  timetableobj[`${timingz}${dayz}`].subject = subject;
  await timetable.findByIdAndUpdate(timetableobj.id, timetableobj);
  res.redirect('/timetable/id/'+ req.params.timetableid);
});

module.exports = router