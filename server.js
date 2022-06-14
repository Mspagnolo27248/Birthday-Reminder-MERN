const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const path = require('path')
const cron = require('node-cron')
const emailer = require('./utils/birthday-email')

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const taskScheduler = require("./utils/schedule")

const port = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./client/build")));
const pw = process.env.PASSWORD
const dbUrl = "mongodb+srv://mspagnolo-admin:"+pw+"@cluster0.lxizv.mongodb.net/BirthdayApp?retryWrites=true&w=majority"
//TODO- abstract db from URI
mongoose.connect(dbUrl)
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));

//Models
const userSchema = {
    firstname: String,
    lastname: String,
    group: String,
    birthday: String,
    reminder:String
}

const User = mongoose.model("User", userSchema)



app.get("/User", (req, res) => {

    //  const user1 = new User({
    //      firstname:'Jen',
    //      lastname:'Spagnolo',
    //     birthday:'3/11/1989',
    //     group:'Family'})
    // user1.save()
    console.log('Returning All Users')
    User.find().lean().exec({}, function (err, results) {
        if (err) {
            console.log(err)
        } else {
            res.send(results)
        }
    })
})

app.post("/User", (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        group: req.body.group,
        birthday: req.body.birthday,
        reminder:req.body.reminder
    })
    user.save();
    res.send(JSON.stringify(user))

})

app.put("/User", (req, res) => {
   const updatedUser =  {
        firstname: req.body.firstname,
        lastname : req.body.lastname,
        group: req.body.group,
        birthday: req.body.birthday,
        reminder:req.body.reminder
    }

    User.findByIdAndUpdate(req.body.mongoId,updatedUser,
    function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", docs);
            res.send(docs)
        }
    });
});

app.delete("/User", (req, res) => {
    
 
     User.findByIdAndDelete(req.body.mongoId,
     function (err, docs) {
         if (err){
             console.log(err)
         }
         else{
             console.log("Deleted User : ", docs);
             res.send(docs);
         }
     });
 });
 
app.get("/Bdays", (req, res) => {
    const currentMonth = new Date().getMonth()
    const currentDay = new Date().getDate()

    console.log('Returning Todays/Months Birthdays')
    User.find().lean().exec({}, function (err, results) {
        if (err) {
            console.log(err)
        } else {
            const todaysBirthdays = results.filter((a) => (new Date(a.birthday).getMonth() == currentMonth &&
                new Date(a.birthday).getDate() == currentDay))

            const monthBirthdays = results.filter((a) => (new Date(a.birthday).getMonth() == currentMonth))
            res.send([{
                todays: todaysBirthdays
            }, {
                thisMonths: monthBirthdays
            }])
        }
    })
})



// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });

app.listen(port, () => {       
  

    console.log(`App Listening on ${port}`)
    console.log(dbUrl)


})

