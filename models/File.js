const mongoose =  require("mongoose");
const nodemailer = require("nodemailer")


require("dotenv").config();
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }

})

fileSchema.post("save" , async function(doc){
    try{
        console.log("doc" , doc);

        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                 user:process.env.MAIL_USER,
                 pass:process.env.MAIL_PASS,
            }
        })
        let info =await transporter.sendMail({
            from:`Head of the Department-Nikhil Solanki`,
            to:doc.email,
            subject:"New file uploaded of cloudinary",
            html:`<h1>HELLO BROTHER </h1><p>FILE UPLOADED , Sir</p><P>View Here-<a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`
        })

        console.log("info bro" , info)

    }catch(error){
       console.log(error);
        res.status(401).json({
            success:false,
            message:'there is an error occured from your mistake right your'
        })
    }
})



const File = mongoose.model("File" , fileSchema);
module.exports = File;