import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TrueFocus from "../components/TrueFocus";

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user ? (
        <h1>Welcome, {user?.username}!</h1>
      ) : (
        <h1>Welcome!</h1>
      )}

      <TrueFocus
        sentence="Kiez Swap"
        manualMode={false}
        blurAmount={5}
        borderColor="blue"
        animationDuration={0.5}
        pauseBetweenAnimations={1}
      />
    </div>
  );
}

export default Home;
