const mongoose = require('mongoose')
const imgSchema = new mongoose.Schema({
	  
<<<<<<< HEAD
	  img: String,
=======
	  img: 
      	{ data: Buffer, contentType: String },
      path: String
>>>>>>> 4a249c15c374774d9be1873d4f8c391704148a9c
  
})

const Img = mongoose.model(`Img`, imgSchema)
module.exports = Img
