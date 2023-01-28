import WebSocket, { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8000 })
console.log("listening on port 8000")

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const data = JSON.parse(message)
        console.log(data.username)
        if (data.type === "message") {
            console.log(data.data)
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: "message", data: data.data, username: data.username }))
                    console.log("Data sent")
                }
            })
        }
    })
})