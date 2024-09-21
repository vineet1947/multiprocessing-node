// const fibonacci = require('../Fibonacci')

//consumer code

const rq = require('amqplib/callback_api')

rq.connect('amqp://localhost', (err, connection) => {
  if (err) {
    process.exit()
  } else {
    const queueName = 'FabSeries1'
    connection.createChannel((err, channel) => {
      channel.assertQueue(queueName, { durable: false })
      channel.consume(
        queueName,
        (message) => {
          console.log('Waiting for messages')
          console.log(`${queueName} - ${message.content.toString()}`)
        },
        { noAck: true }
      )
    })
  }
})

//worker code

// process.on('message', (number) => {
//   let fabNum = fibonacci.getFibonacciSum(number)
//   console.log(`fib-worker1 pid is ${process.pid}`)
//   process.send(fabNum)
// })
