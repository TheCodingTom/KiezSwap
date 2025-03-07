import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>User Profile</h1>
      {/* <DropdownMenu/> */}

      {user && (
        <div>
          <h3>Hi {user.username}</h3>
          <h4>Email: {user?.email}</h4>
          <img src={user.image} alt="user avatar" style={{width:"150px", height:"auto"}}/>
        </div>
      )}
    </>
  );
}

export default Profile;
