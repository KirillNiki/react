
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  console.log('>>>>')
  let file = fs.readFileSync('./public/index.html')

  res.setHeader('Content-Type', 'text/html')
  res.end(file)
})

server.listen(7000)
console.log('started >>>>')
