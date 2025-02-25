import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";

function Register() {
  return (
    <div className="form-container">
      <h1>Register</h1>
      <form action="submit" className="register-form">
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" />
        <Button>Register</Button>
      </form>
    </div>
  );
}

export default Register;
