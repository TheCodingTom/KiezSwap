import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {

  const {user} = useContext(AuthContext)
  return (
    <div>
      {user ? <h1>Welcome to KiezSwap, {user?.username}!</h1> : <h1>Welcome to KiezSwap!</h1>}
    </div>
  );
}

export default Home;
