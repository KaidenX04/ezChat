let ws
const sendButton = document.querySelector("#send")
const message = document.querySelector("#message")
const chatBox = document.querySelector("#chat")
const connectButton = document.querySelector("#connect")
let usernameField = document.querySelector("#username")
let connected = false

connectButton.addEventListener("click", () => {
    if (connected === false){
        if (usernameField.value !== ""){
            ws = new WebSocket("ws://localhost:8000")
            connected = true;
            sendButton.classList.remove("inactive")
            connectButton.classList.add("inactive")
            ws.addEventListener("message", (event) => {
                const data = JSON.parse(event.data)
                if (data.type === "message") {
                    addMessage(`${data.username}: ${data.data}`)
                }
            })
        }
    }
})

sendButton.addEventListener("click", () => {
    if (connected === true){
        sendMessage()
    }
    else{
        alert("Please enter a username and connect before sending messages.")
    }
})

const sendMessage = () => {
    if (!message.value) {
        return false
        //validate
    }

    ws.send(JSON.stringify({ type: "message", data: message.value, username: `${usernameField.value}` }))

    addMessage(`${usernameField.value}: ${message.value}`)
    message.value = ""
}

const addMessage = (message) => {
    const node = document.createElement("p")
    node.innerText = message;
    chatBox.appendChild(node)
}