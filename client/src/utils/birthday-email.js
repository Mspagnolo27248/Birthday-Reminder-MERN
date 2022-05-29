const nodemailer = require('nodemailer')

const dailyEmail = (people)=>{

    const header = "<h2> Today's Birthdays </h2>"    
    const lines = people.map((a)=> `<div> ${a.name} on ${a.birthday} </div>`).join('');
    const html =  header + lines


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'wtm.owner.community@gmail.com',
          pass: 'WonderLust1!'
        }
      });
    
      const mailOptions = {
        from: 'wtm.owner.community@gmail.com',
        to: 'md.spagnolo@yahoo.com',
        subject: 'Daily Birthday Email',
        text: 'Birthday Email',
        html:html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
}


module.exports = { dailyEmail };