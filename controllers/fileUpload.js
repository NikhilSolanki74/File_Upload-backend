const File = require("../models/File");

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