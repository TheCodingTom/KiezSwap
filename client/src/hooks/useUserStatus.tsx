// custom hooks are components that don't return jsx but a variable, object etc

import { useEffect, useState } from "react";

function useUserStatus() {
  const [token, setToken] = useState<string | null>("");
  const [userStatusMessage, setUserStatusMessage] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
      setUserStatusMessage("user is logged in");
    } else {
      setToken(null);
      setUserStatusMessage("user is logged out");
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return { token, userStatusMessage };
}

export default useUserStatus;
