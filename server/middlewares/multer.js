import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

// 1kilobyte (1024 bytes) x 1KB = 1MB x 5 = 5MB - Handling file size directly in multer
const limits = {fileSize: 5 * 1024 * 1024 }

const fileFilter = (req, file, cb) => {
  console.log("file :>> ", file);
  // Check the file extension to decide if we allow upload
  let extension = path.extname(file.originalname);
  if (extension !== ".png" && extension !== ".jpg" && extension !== ".jpeg") {
    // To reject this file pass `false`, like so:
    console.log("File extension not supported".red);
    cb(null, false);
    cb(new Error("You are trying to upload a not supported file"));
  } else {
    // To accept the file pass `true`, like so:
    console.log("File accepted");
    cb(null, true);
  }
};

// function that we use to upload files
const multerUpload = multer({ storage: storage, fileFilter: fileFilter, limits:limits });

export default multerUpload;
