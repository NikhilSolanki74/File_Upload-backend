const cloudinary = require("cloudinary").v2
require("dotenv").config();
exports.connectcloudinary = ()=>{
    try{
         cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            API_SECRET:process.env.API_SECRET,

         })   

    }catch(error){
         console.log(error)
    }
    
}