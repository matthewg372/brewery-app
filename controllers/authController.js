const express =  require(`express`)
const router = express.Router()

router.get(`/register`, (req,res) => {
	res.render(`auth/register.ejs`)
})

module.exports = router