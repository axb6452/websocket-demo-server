const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

wss.broadcast = function broadcast (data) {
  wss.clients.forEach(function each (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

wss.on('connection', function (ws) {
  console.log('Got a connection!')

  ws.on('message', function (message) {
    console.log(message)

    wss.broadcast(message)
  })
})
