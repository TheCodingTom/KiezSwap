import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import ThemeToggle from "./ThemeToggle";
import "../styles/ThemeToggle.css";

function BackButtonThemeContainer() {
  const backButton = useNavigate();
  const navigateTo = () => {
    backButton(-1);
  };

  return (
    <div className="backButton-dark-container">
      <Button onClick={navigateTo}>Back</Button>
      <ThemeToggle />
    </div>
  );
}

export default BackButtonThemeContainer;
