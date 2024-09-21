const express = require('express')
const cluster = require('cluster')
const totalCPUs = require('os').cpus().length

const fibonacci = require('./Fibonacci') // Adjust the path as necessary

//cluster code

if (cluster.isMaster) {
  console.log('total cpu count', totalCPUs)

  for (var i = 0; i < totalCPUs; i++) {
    cluster.fork()
  }
  cluster.on('online', (worker) => {
    console.log(`worker id is: ${worker.id} process id : ${worker.process.pid}`)
  })

  cluster.on('exit', (worker) => {
    console.log(
      `worker id is: ${worker.id} process id : ${worker.pid} is Offline`
    )
    cluster.fork()
  })
} else {
  const app = express()

  //http://localhost:3000?num=20

  app.get('/fib', (req, res) => {
    console.log(
      ` worker process id : ${cluster.worker.process.pid} has accepted the request`
    )
    const num = parseInt(req.query.num, 10)
    if (isNaN(num) || num < 0) {
      return res.status(400).send({ error: 'Invalid number' })
    }

    const sum = fibonacci.getFibonacciSum(num)
    res.send(`<h1> ${sum}</h1>`)
  })

  app.listen(3000, () => {
    console.log('Server is running on port 3000')
  })
}
