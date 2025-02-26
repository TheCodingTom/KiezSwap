import multer from "multer"

const storage = multer.diskStorage({
    
  })

  const fileFilter = (req, file, cb) => {
    console.log('file :>> ', file);
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
  
    // To reject this file pass `false`, like so:
    cb(null, false)
  
    // To accept the file pass `true`, like so:
    cb(null, true)
  
    // You can always pass an error if something goes wrong:
    cb(new Error('I don\'t have a clue!'))
  }

  
  // function that we use to upload files
  const multerUpload = multer({ storage: storage, fileFilter:fileFilter })

  export default multerUpload