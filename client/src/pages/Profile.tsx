import { useContext, useEffect, useState } from "react";

import { GetProfileOkResponse } from "../types/customTypes";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const [loggedUser, setLoggedUser] = useState("");
  const {user} = useContext(AuthContext)
  const token = localStorage.getItem("token");

  const getUserProfile = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      // method appends new fields to object
      "Authorization",
      `Bearer ${token}`
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/profile",
        requestOptions
      );
      // console.log(response);

      if (!response.ok) {
        console.log("something went wrong with the user profile response");

        // add error message for user
      }

      if (response.ok) {
        const result = (await response.json()) as GetProfileOkResponse;
        console.log('result :>> ', result);
        console.log('user :>> ', user);;
        setLoggedUser(result.username);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  
useEffect(() => {
 getUserProfile()
}, [])


  return (
    <>
      <h1>User Profile</h1>
      {/* <DropdownMenu/> */}

      <button onClick={getUserProfile}>Get profile</button>

      {loggedUser && (
        <div>
          <h3>Hi {loggedUser}</h3>
          <h4>Email: {user?.email}</h4>
        </div>
      )}
    </>
  );
}

export default Profile;
