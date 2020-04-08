const express =  require(`express`)
const router = express.Router()
const User = require(`../models/user`)
const bcrypt = require(`bcrypt`)

router.get(`/register`, (req,res) => {
	res.render(`auth/register.ejs`)
})

router.get(`/login`, (req,res) => {
	res.render(`auth/login.ejs`)
})

router.post(`/login`, async (req, res, next) => {
	try{
		const foundUser = await User.findOne({username : req.body.username})
		if(!foundUser){
			req.session.message = "Invalid username or password"
			res.redirect('auth/login')
		}
		else{
			const logInInfoIsValid = bcrypt.compareSync(req.body.password,foundUser.password);
			if(logInInfoIsValid){
				req.session.loggedIn = true
				req.session.userId = foundUser._Id
				req.session.username = foundUser.username
				req.session.message = `${foundUser.username} has logged In`
				res.redirect(`/`)
			}
			else{
				req.session.message = "Invalid username or password"
				res.redirect(`/auth/login`)
			}
		}
	}
	catch(error){
		next(error)
	}
})

router.get(`/logout`,async (req, res, next) => {
	try{
		req.session.message = "Successfully logged out"
		await req.session.destroy()
		
		console.log("past await destroy")
		res.redirect(`/auth/login`)
	}
	catch(error){
		next(error)
	}
	
})

router.post(`/register`, async (req, res, next) => {
	try{
		const desiredUsername = req.body.username
		const desiredPassword = req.body.password
		const newAdmin = req.body.admin
		const userWithThisUsername = await User.findOne({username:desiredUsername})
		
		console.log("stuff", desiredUsername,desiredPassword,newAdmin)
		
		if(userWithThisUsername){
			req.session.message = `ERROR!!! Username ${desiredUsername} is already taken`
			console.log(`Username ${desiredUsername} is already taken`)
			res.redirect(`/auth/register`)
		}
		else{
			const salt = bcrypt.genSaltSync(10)
			const hashedPassword = bcrypt.hashSync(desiredPassword,salt)

			const addedUser = {
				username : desiredUsername,
				password : hashedPassword,
			}
			
			if(req.body.admin === 'on'){
				addedUser.admin = true
			}
			else{
				addedUser.admin = false
			}

console.log("addedUser",addedUser)
			const createdUser = await User.create(addedUser)
			req.session.loggedIn = true
			req.session.userId = createdUser._Id
			req.session.username = createdUser.username
			req.session.message = "Successfully Registered An Account"

			console.log("addedUser After",addedUser)
			res.redirect('/')
		}
		
	}
	catch(error){
		next(error)
	}
})

module.exports = router