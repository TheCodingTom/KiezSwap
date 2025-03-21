import { useNavigate } from "react-router";
import picture from "../images/error-logo.png";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

function NoMatchPage() {
  const goBackTo = useNavigate();

  const redirectTo = () => {
    // with the other method you don't need this 2nd function
    goBackTo("/");
  };

  const autoRedirect = () => {
    setTimeout(() => {
      redirectTo();
    }, 3000);
  };

  useEffect(() => {
    autoRedirect();
  }, []);

  return (
    <div className="error-page">
      <h1>Sorry, nothing to display here</h1>
      <img src={picture} className="logo" alt="" />
      <h4>You'll be redirected to the home page in 3 seconds </h4>
      <Button onClick={redirectTo}>Go back to home page</Button>
    </div>
  );
}

export default NoMatchPage;
