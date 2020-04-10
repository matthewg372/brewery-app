require(`dotenv`).config()
const express = require(`express`)
const server = express()
const PORT = process.env.PORT
<<<<<<< HEAD
=======
const multer = require('multer')
const upload = multer({dest: "uploads/"})
// const Img = require(`./models/img`)
// const fs = require('fs')
>>>>>>> 4a249c15c374774d9be1873d4f8c391704148a9c
const db = require(`./db/db.js`)

const bodyParser = require(`body-parser`)
const methodOverride = require('method-override')
const session = require(`express-session`)


server.use(express.static(`public`))
server.use(bodyParser.urlencoded({extended:false}))
server.use(methodOverride('_method'))


server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

server.use((req, res, next) => {
	res.locals.loggedIn = req.session.loggedIn
	res.locals.username = req.session.username
	res.locals.message = req.session.message
	res.locals.admin = req.session.admin
	res.locals.userId = req.session.userId
	req.session.message = undefined
	next()
})

const authController = require(`./controllers/authController.js`)
server.use(`/auth`, authController)
const breweryController = require(`./controllers/breweryController.js`)
server.use(`/brewery`, breweryController)
const drinkController = require(`./controllers/drinkController.js`)
server.use(`/drink`, drinkController)
const generalController = require(`./controllers/generalController.js`)
server.use(`/general`, generalController)
const commentController = require(`./controllers/commentsController.js`)
server.use(`/comment`, commentController)



server.get(`/`, (req,res) => {
	res.render(`home.ejs`)
})






server.listen(PORT, () => {
	console.log(`Server running on port, ${PORT}`)
})