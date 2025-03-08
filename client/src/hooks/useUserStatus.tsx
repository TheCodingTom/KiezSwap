// custom hooks are components that don't return jsx but a variable, object etc

import { useEffect, useState } from "react";
import { getToken } from "../utilities/getToken";

function useUserStatus() {
  const [token, setToken] = useState<string | null>(null);
  const [userStatusMessage, setUserStatusMessage] = useState("");

  useEffect(() => {
    const storedToken = getToken()
    if (storedToken) {
      setToken(storedToken);
      setUserStatusMessage("user is logged in");
    } else {
      setToken(null);
      setUserStatusMessage("user is logged out");
    }
  }, []);

  return { token, userStatusMessage };
}

export default useUserStatus;
