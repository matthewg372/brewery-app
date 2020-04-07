const express =  require(`express`)
const router = express.Router()
const User = require(`../models/user`)
const bcrypt = require(`bcrypt`)

router.get(`/register`, (req,res) => {
	res.render(`auth/register.ejs`)
})

router.post(`/register`, async (req, res, next) => {
	try{
		const desiredUsername = req.body.username
		const desiredPassword = req.body.password
		const newAdmin = req.body.admin
		const userWithThisUsername = await User.findOne({username:desiredUsername})
		
		console.log("stuff", desiredUsername,desiredPassword,newAdmin)
		
		if(userWithThisUsername){
			req.session.message = `Username ${desiredUsername} is already taken`
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
		
	}
})

module.exports = router