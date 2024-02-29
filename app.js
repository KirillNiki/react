
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  console.log('>>>>')
  let file

  if (req.url === '/') {
    file = fs.readFileSync('./build/index.html')
  }
  else {
    file = fs.readFileSync(`./build/${req.url}`)
  }
  res.setHeader('Content-Type', 'text/html')
  res.end(file)
})

server.listen(7000)
console.log('started >>>>')
