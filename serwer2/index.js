const ws = require('ws')
const server =  new ws.Server({port:3002})
server.on('connection',(socket)=>{
    console.log("client connected")
    socket.send('hello client')
})