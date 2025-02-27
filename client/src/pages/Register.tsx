import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { ImageUploadOkResponse, RegisterOkResponse, UserRegisterFormType, UserType } from "../types/customTypes";

function Register() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [newUser, setNewUser] = useState<UserRegisterFormType | null>(null);

  const [user, setUser] = useState<UserType | null>(null) // this keeps the user logged in

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

  const handleRegisterSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(newUser);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    // Input validation here - username,password,email
    if (newUser) {
      urlencoded.append("username", newUser.username);
      urlencoded.append("email", newUser.email);
      urlencoded.append("password", newUser.password);
    } else {
      console.log("All the fields are required");
    }
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/register",
        requestOptions
      );
      const result = await response.json() as RegisterOkResponse
      console.log(result.message);
      setUser(result.user)
      

    } catch (error) {
      console.log("error :>> ", error);
    }
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
        <form className="register-form">
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
        {user && 
         <div>
          <h3>{user.username}</h3>
           <img
            src={user.image}
            alt="avatar image"
            style={{ width: "200px" }}
          />
         </div>
        }
      </div>
    </>
  );
}

export default Register;
