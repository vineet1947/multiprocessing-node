const rq = require('amqplib/callback_api')
const fabObj = require('../Fibonacci')

function sendValueInFabQueue1(num) {
  rq.connect('amqp://localhost', (err, connection) => {
    if (err) process.exit()
    const queueName = 'FabSeries1'

    connection.createChannel((error, channel) => {
      if (error) {
        console.log(error)
        process.exit()
      } else {
        let fabNum = fabObj.getFibonacciSum(num)
        channel.assertQueue(queueName, { durable: false })
        channel.sendToQueue(queueName, Buffer.from(fabNum.toString()))
        console.log(`Queue name is ${queueName}`)
      }
    })
  })
}

module.exports = sendValueInFabQueue1
