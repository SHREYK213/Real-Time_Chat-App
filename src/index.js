const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New Websocket Connection')

    socket.emit('message', 'Welcome!!')
    socket.broadcast.emit('message', 'A new user has Joined')

    socket.on('sendMessage', (message, callback) => {
        io.emit('message', message)
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has Left')
    })
})


server.listen(port, () => {
    console.log(`Server is up on ${3000} click: http://localhost:3000/`)
})