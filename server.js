require(`dotenv`).config()
const express = require(`express`)
const server = express()
const PORT = process.env.PORT
require(`./db/db.js`)

server.use(express.static(`public`))

server.get(`/`, (req,res) => {
	res.render(`home.ejs`)
})






server.listen(PORT, () => {
	console.log(`Server running on port, ${PORT}`)
})