import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'       
;
          
cloudinary.config({ 
  cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
  api_key: 'process.env.CLOUDINARY_API_kEY', 
  api_secret: 'process.env.CLOUDINARY_API_SECRET' 
});


const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        // upload file on the cloudinary
         const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        // file has been uploaded successfully
        console.log("File is uploaded on cloudinary",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload oper. got failed
    }
}



export {uploadOnCloudinary};