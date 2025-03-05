
import { Button } from "react-bootstrap";
// import lock from "../images/lock-logo.png";
import { NavLink, useNavigate } from "react-router";

function ProtectedRoutePage() {
    const loginPage = useNavigate()
    const goToLogin = () => {
      loginPage("/")
    }
  return (
    <div className="protected-route-page">
      <h1>Login to see more!</h1>
      <p>
        Sorry, this content is available only for users that already have an
        account.
      </p>
      {/* <img src={lock} className="logo" alt="image of a lock" /> */}

     <NavLink to={"/login"}> <Button onClick={goToLogin}>Login</Button></NavLink>
      
    </div>
  );
}

export default ProtectedRoutePage;