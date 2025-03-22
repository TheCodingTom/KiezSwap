import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TrueFocus from "../components/TrueFocus";
import bear from "../images/berlin-logo.png";

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="home-container">
      <h1>Welcome to</h1>
      <div className="home-logo-container">
        <TrueFocus
          sentence="Kiez Swap"
          manualMode={false}
          blurAmount={5}
          borderColor="blue"
          animationDuration={0.5}
          pauseBetweenAnimations={1}
        />
        <img src={bear} className="home-logo" alt="image of berlin bear" />
      </div>
      {user ? <h1>{user?.username}!</h1> : ""}
    </div>
  );
}

export default Home;
