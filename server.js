const express = require("express");
const app = express();
const port = 4000;

const server = app.listen(`${port}`, function() {
	console.log(`Server started on port ${port}`);
});
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:8080",
		methods: ["GET", "POST"],
		transports: ["websocket", "polling"],
		credentials: true,
	},
	allowEIO3: true,
});

function getRandomValue() {
	return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
}
io.on("connection", (socket) => {
	setInterval(() => {
		socket.broadcast.emit("newdata", getRandomValue());
	}, 5000);
	socket.on("ferret", (name, fn) => {
		console.log(name);
		fn(name);
	});
	socket.on("message", (msg) => io.emit("message", msg));
});
