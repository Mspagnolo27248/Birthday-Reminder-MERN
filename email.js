const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const request = require('request');


const currentMonth = new Date().getMonth()
const currentDay = new Date().getDate()
const pw = process.env.PASSWORD
const dbUrl = "mongodb+srv://mspagnolo-admin:"+pw+"@cluster0.lxizv.mongodb.net/BirthdayApp?retryWrites=true&w=majority"

//Models
const userSchema = {
  firstname: String,
  lastname: String,
  group: String,
  birthday: String,
  reminder:String
}

const User = mongoose.model("User", userSchema)

mongoose.connect(dbUrl)
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));

let convertDate = (yyyyMMdd) => {
  const splitDate = yyyyMMdd.split('-')
  return new Date(splitDate[0], splitDate[1]-1, splitDate[2])
}


  User.find().lean().exec({}, function (err, results) {
      if (err) {
          console.log(err)
      } else {
          const todaysBirthdays = results.filter((a) => (convertDate(a.birthday).getMonth() == currentMonth &&
               convertDate(a.birthday).getDate() == currentDay))

          const monthBirthdays = results.filter((a) => (new Date(a.birthday).getMonth() == currentMonth))

          const header = `<h2> ${currentMonth} Birthdays </h2>`   
          const lines = monthBirthdays.map((a)=> `<div> ${a.firstname+' '+a.lastname} on ${a.birthday} </div>`).join('');
          const html =  header + lines
     
          request.post(process.env.TRUSTIFI_URL + '/api/i/v1/email', {
          headers: {
          'x-trustifi-key': process.env.TRUSTIFI_KEY,
          'x-trustifi-secret': process.env.TRUSTIFI_SECRET
        },
        json:{"recipients":[{"email":"mspagnolo27@gmail.com"}],"title":"Title","html":html}
      }, (err, res, body) => {
         console.log(body);
      });
      }})