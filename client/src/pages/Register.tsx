import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";

function Register() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");

  const handleAttachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    
    };


    try {
      const response = await fetch("http://localhost:4000/api/users/uploadImage", requestOptions)
      const result = await response.json()
      console.log('result :>> ', result);
      
    } catch (error) {
      console.log('error :>> ', error);
    }

    
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form action="submit" className="register-form" onSubmit={handleImageUpload}>
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" />
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleAttachFile}
        />
        <button >Upload image</button>
        <Button>Register</Button>
      </form>
    </div>
  );
}

export default Register;
