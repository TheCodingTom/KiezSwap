import { useNavigate } from "react-router";
import picture from "../images/error-logo.png";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

function NoMatchPage() {
  const goBackTo = useNavigate();

  const redirectTo = () => {
    // state to indicate to the home page that the user is being redirected from the 404 page
    goBackTo("/", { state: { from404: true } });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      redirectTo();
    }, 3000);

    return () => clearTimeout(timer); // cleanup timeout to avoid problems if the component unmounts
  }, []);

  return (
    <div className="error-page">
      <h1>Sorry, nothing to display here</h1>
      <img src={picture} className="logo" alt="error logo" />
      <h4>You'll be redirected to the home page in 3 seconds </h4>
      <Button onClick={redirectTo}>Go back to home page</Button>
    </div>
  );
}

export default NoMatchPage;
