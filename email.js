const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const emailer = require('./utils/birthday-email')

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



          emailer.dailyEmail(todaysBirthdays);
          emailer.monthlyEmail(monthBirthdays);
      }})