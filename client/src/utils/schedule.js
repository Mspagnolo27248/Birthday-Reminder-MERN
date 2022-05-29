const cron = require('node-cron')
const emailer = require('./birthday-email')


const taskScheduler = (data)=>{
  cron.schedule('30 6 * * *', () => {
      console.log('Task Ran')
      emailer.dailyEmail(data)
    })
  };


  module.exports  = {taskScheduler}