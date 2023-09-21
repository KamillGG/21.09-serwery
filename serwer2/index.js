const ws = require('ws')
const server =  new ws.Server({port:3002})
var json = [
    {doorStatus:"true"}
]
server.on('connection',(socket)=>{
    json[0].doorStatus = true
    console.log("client connected")
    setInterval(()=>{
        socket.send(`${JSON.stringify(json)}`)
        if(json[0].doorStatus=="true"){
        json[0].doorStatus = "false"
        }
        else{
            json[0].doorStatus = "true"
        }
    },5000)
    
})