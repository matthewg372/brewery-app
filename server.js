require(`dotenv`).config()
const express = require(`express`)
const server = express()
const PORT = process.env.PORT
const multer = require('multer')
const upload = multer({dest: "uploads/"})
// const Img = require(`./models/img`)
// const fs = require('fs')
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


// server.post('/brewery/:id', upload.single('img'), (req, res) => {
//     let img = fs.readFileSync(req.file.path);
//  let encode_image = img.toString('base64');
//   // Define a JSONobject for the image attributes for saving to database
  
//  let finalImg = {
//       contentType: req.file.mimetype,
//       image:  new Buffer(encode_image, 'base64')
//    };
// db.collection('imgs').insertOne(finalImg, (err, result) => {
//     console.log(result)
 
//     if (err) return console.log(err)
 
//     console.log('saved to database')
//     res.redirect('/')
   
     
//   })
// })

server.get(`/`, (req,res) => {
	res.render(`home.ejs`)
})






server.listen(PORT, () => {
	console.log(`Server running on port, ${PORT}`)
})