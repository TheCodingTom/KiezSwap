import { TextField } from "@mui/material";
import { useContext,  } from "react";
import { Button } from "react-bootstrap";

import UploadAvatar from "../components/UploadAvatar";
import { AuthContext } from "../context/AuthContext";

function Register() {

  const {handleRegisterInputChange, handleRegisterSubmit} = useContext(AuthContext)
  // const [newUser, setNewUser] = useState<UserRegisterFormType | null>(null);

  // const [user, setUser] = useState<UserType | null>(null);  this keeps the user logged in - remove once I have authContext

  // const handleRegisterInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   console.log(e.target.name);
  //   console.log(e.target.value);

  //   setNewUser({ ...newUser!, [e.target.name]: e.target.value });
  // };

  // const handleRegisterSubmit = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   console.log(newUser);

  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //   const urlencoded = new URLSearchParams();
  //   // Input validation here - username,password,email
  //   if (newUser) {
  //     urlencoded.append("username", newUser.username);
  //     urlencoded.append("email", newUser.email);
  //     urlencoded.append("password", newUser.password);
  //   } else {
  //     console.log("All the fields are required");
  //   }
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: urlencoded,
  //   };

  //   try {
  //     const response = await fetch(
  //       "http://localhost:4000/api/users/register",
  //       requestOptions
  //     );
  //     const result = (await response.json()) as RegisterOkResponse;
  //     console.log(result.message);
  //     setUser(result.user);
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // };

  return (
    <>
      <h1>Register</h1>

      <div className="form-container">
        <form className="register-form">
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            onChange={handleRegisterInputChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleRegisterInputChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            onChange={handleRegisterInputChange}
          />

          <Button onClick={handleRegisterSubmit}>Register</Button>
        </form>
      </div>

      <UploadAvatar />
    </>
  );
}

export default Register;
