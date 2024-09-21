const express = require('express')
const cluster = require('cluster')
const totalCPUs = require('os').cpus().length
const path = require('path')

//worker code

if (cluster.isMaster) {
  console.log('Master Process Pid ', process.pid)
  const worker1Path = path.resolve(__dirname, 'workers/fab-series-worker1.js')
  const worker2Path = path.resolve(__dirname, 'workers/fab-series-worker2.js')

  const worker1 = require('child_process').fork(worker1Path)
  const worker2 = require('child_process').fork(worker2Path)

  console.log(`Child process ID is ${worker1.pid}`)
  console.log(`Child process ID is ${worker2.pid}`)

  worker1.on('message', function (number) {
    console.log(`fab number from child 1 is ${number}`)
  })
  worker2.on('message', function (number) {
    console.log(`fab number from child 2 is ${number}`)
  })

  cluster.on('online', (worker) => {
    console.log(`message revived from - ${worker.process.pid}`)
    worker.on('message', (num) => {
      if (num % 2 === 0) {
        worker1.send(num)
      } else {
        worker2.send(num)
      }
    })
  })

  for (let i = 0; i < totalCPUs - 2; i++) {
    let worker = cluster.fork()
    console.log(`worker started on PID - ${worker.process.pid}`)
  }

  console.log(`total number fo cpu count is  ${totalCPUs}`)
} else {
  const app = express()

  //http://localhost:3000?num=20

  app.get('/fib', (req, res) => {
    process.send(parseInt(req.query.num, 10))
    console.log(`  process id : ${process.pid} has accepted the request`)
    res.send(
      '<h3> The request has been recievd successfully we will send a mail once your calcualtion is ready </h3>'
    )
  })

  app.listen(3000, () => {
    console.log('Server is running on port 3000')
  })
}
