import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import { isUserLogged } from "../utils/AuthUtility";
import ProtectedRoutePage from "../pages/ProtectedRoutePage";

type ProtectedRouteType = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteType) {
  const { user } = useContext(AuthContext); 
//   const isAuth = isUserLogged(user);

  return <div>{user ? children : <ProtectedRoutePage />}</div>;
}

export default ProtectedRoute;