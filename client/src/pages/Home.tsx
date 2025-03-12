import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TrueFocus from "../components/TrueFocus";

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>Welcome to</h1>
      <TrueFocus
        sentence="Kiez Swap"
        manualMode={false}
        blurAmount={5}
        borderColor="blue"
        animationDuration={0.5}
        pauseBetweenAnimations={1}
      />
      {user ? <h1>{user?.username}!</h1> : ""}
    </div>
  );
}

export default Home;
