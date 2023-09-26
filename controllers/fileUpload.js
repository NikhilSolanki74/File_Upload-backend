const File = require("../models/File");
const cloudinary = require("cloudinary").v2
exports.localFileUpload = async (req, res) =>{
    try {
        const file = req.files.file;
        console.log("aagyi file bro -->" , file)
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[0]}`;
        console.log("Path -->" , path)
        file.mv(path , (err) => {
            console.log(err)
        })

        res.json({
            success:true,
            message:'local file uploaded successfully bro'
        })
          

    }catch(error){
    console.log(error);
    }
}

function isFTS(type , supportedTypes){
    
    return supportedTypes.includes(type) 
}
  
async function uploadFileToCloudinary(file , folder , quality){
    const options = {folder};
   if(quality){
    options.quality = quality;
   }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath , options )
}

exports.imageUpload= async (req , res)=>{
    try{
     const {name , tags , email } = req.body
     console.log(name , tags , email);
     const file = req.files.imageFile;
     console.log(file);

     const supportedTypes = ["jpg" , "jpeg" , "png"]
     const filetype = file.name.split('.')[1].toLowerCase();
     
     if(!isFTS(filetype , supportedTypes)){
        return res.status(400).json({
            success:false,
            message:"file format is not supported bro"
        })
     }
     const response = await uploadFileToCloudinary(file , "ABCD");
     
     console.log(response)

       const fileData = await File.create({
        name ,
        tags,
        email,
        imageUrl:response.secure_url
       })
    res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'image Successfully Uploaded '
    })

    } catch(error){
        console.error(error);
     res.status(400).json({
        success:false,
        message:"there is an error with your file bro"
     })
    }

}


exports.videoUpload= async (req, res)=>{
    try{

        const {name , tags , email } = req.body
        console.log(name , tags , email);
        const file = req.files.videoFile;
        
        const supportedTypes = ["mp4" , "mov"   ]
     const filetype = file.name.split('.')[1].toLowerCase();
     
     if(!isFTS(filetype , supportedTypes)){
        return res.status(400).json({
            success:false,
            message:"file format is not supported bro"
        })
     }

     const response = await uploadFileToCloudinary(file , "ABCD" );

     const fileData = await File.create({
        name ,
        tags,
        email,
        imageUrl:response.secure_url
       })

       res.json({
        success:true,
        videoUrl:response.secure_url,
        message:'video Successfully Uploaded '
    })

    }catch(error){

    }
}

exports.imageSizeReducer = async (req , res) => {
    try{
        const {name , tags , email } = req.body
        console.log(name , tags , email);
        const file = req.files.imageFile;
        
        const supportedTypes = ["jpeg" , "jpg" , "png"]
     const filetype = file.name.split('.')[1].toLowerCase();
     
     if(!isFTS(filetype , supportedTypes)){
        return res.status(400).json({
            success:false,
            message:"file format is not supported bro"
        })
     }

     const response = await uploadFileToCloudinary(file , "ABCD", 30);
     const fileData = await File.create({
        name ,
        tags,
        email,
        imageUrl:response.secure_url
       })

       res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'image reduced Successfully and uploaded of cloudinary '
    })

    }catch(error){
     console.log(error);
     res.status(401).json({
        success:false,
        message:"file extension not supported "
     })
    }
}