const express = require('express')

const fabQueue1 = require('./queues/fab-queue1')
const fabQueue2 = require('./queues/fab-queue2')

const app = express()

app.get('/', (req, res) => {
  let num = req.query.num
  if (num % 2 === 0) {
    fabQueue1(num)
  } else {
    fabQueue2(num)
  }

  res.send(
    '<h3>The request has been received successfully ,we will send an email once done!! </h3>'
  )
})

app.listen(3000, () => console.log('Express App is running on PORT : 3000'))
