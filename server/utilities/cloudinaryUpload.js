import { v2 as cloudinary } from 'cloudinary'

const cloudinaryUpload = async (file) => {
    try {
        const uploadedImage = await cloudinary.uploader.upload(file.path, { // .path - folder where the img is temporary stored
            folder: "kiez-swap",
        }) 
        return uploadedImage
    } catch (error) {
        console.log('error uploading to cloudinary :>> ', error);
        return null
    }
}

export default cloudinaryUpload