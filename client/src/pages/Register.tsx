import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { ImageUploadOkResponse, UserType } from "../types/customTypes";

function Register() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [newUser, setNewUser] = useState<UserType | null>(null);

  const handleAttachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const file = e.target.files?.[0];

    if (file instanceof File) {
      // if our document/image matches the File type the function will run
      setSelectedFile(file);
    }
  };

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(); // append everything here - username,email,password,image
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/uploadImage",
        requestOptions
      );
      const result = (await response.json()) as ImageUploadOkResponse;

      setNewUser({ ...newUser!, image: result.imageURL }); // we don't know what's already inside newUser (email etc.) so we use spread operator to add the image
      console.log("result :>> ", result);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleRegisterInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.name);
    console.log(e.target.value);

    setNewUser({ ...newUser!, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(newUser);
  };

  return (
    <>
      <div className="form-container">
        <h1>Register</h1>
        <form
          action="submit"
          className="register-form"
          onSubmit={handleImageUpload}
        >
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleAttachFile}
          />
          <button>Upload image</button>
        </form>
      </div>

      <div className="form-container">
        <form className="register-form" >
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            name="username"
            onChange={handleRegisterInputChange}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleRegisterInputChange}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name="password"
            onChange={handleRegisterInputChange}
          />
          <Button onClick={handleRegisterSubmit}>Register</Button>
        </form>
      </div>

      <div>
        {newUser?.image && (
          <img
            src={newUser.image}
            alt="avatar image"
            style={{ width: "200px" }}
          />
        )}
      </div>
    </>
  );
}

export default Register;
