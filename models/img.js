const mongoose = require('mongoose')
const imgSchema = new mongoose.Schema({
	  
	  img: String,
  
})

const Img = mongoose.model(`Img`, imgSchema)
module.exports = Img
