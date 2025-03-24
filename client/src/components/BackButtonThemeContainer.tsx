import { Button } from "react-bootstrap";

import ThemeToggle from "./ThemeToggle";
import "../styles/ThemeToggle.css";
import { useLocation, useNavigate } from "react-router";

function BackButtonThemeContainer() {
  const navigate = useNavigate();
  const location = useLocation();

  // disable back button if navigated from 404
  const disableBack = location.state?.from404;

  const navigateTo = () => {
    if (!disableBack) {
      navigate(-1);
    }
  };

  return (
    <div className="backButton-dark-container">
      <Button onClick={navigateTo} disabled={disableBack}>
        Back
      </Button>
      <ThemeToggle />
    </div>
  );
}

export default BackButtonThemeContainer;
