import fs from "fs";

const deleteTempFile = (file) => {
  if (file) {
    fs.unlink(file.path, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });
  } else {
    //REVIEW this else would work when file is false (file is undefined, or null). If what you want is to make sure you only handle files, you need a different logic.(maybe checking for the type of it?)
    console.log("I can only delete files");
  }
};

export default deleteTempFile;
