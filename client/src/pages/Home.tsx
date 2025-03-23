import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import TrueFocus from "../components/TrueFocus";
import bear from "../images/berlin-logo.png";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      {user ? <h1>Welcome, {user?.username}!</h1> : <h1>Welcome, friend!</h1>}

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

      <div className="home-intro">
        <p>
          Discover Berlin’s local swap and giveaway community! Post items you no
          longer need or find something special — all within your beloved kiez.
        </p>
        <div>
          {user ? (
            <NavLink to={"/listings"}>
              <Button>Go to Listings</Button>
            </NavLink>
          ) : (
            <NavLink to={"/login"}>
              <Button>Login</Button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
