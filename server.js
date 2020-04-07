require(`dotenv`).config()
const express = require(`express`)
const server = express()
const PORT = process.env.PORT

server.use(express.static(`public`))

server.get(`/`, (req,res) => {
	res.render(`home.ejs`)
})






server.listen(PORT, () => {
	console.log(`Server running on port, ${PORT}`)
})