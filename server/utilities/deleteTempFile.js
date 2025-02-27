import fs from "fs";

const deleteTempFile = (file) => {
  if (file) {
    fs.unlink(file.path, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });
  } else {
    console.log("I can only delete files");
  }
};

export default deleteTempFile;
