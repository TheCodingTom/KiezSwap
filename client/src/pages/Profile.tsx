import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import UploadAvatar from "../components/UploadAvatar";

function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="profile-container">
      <h1>User Profile</h1>

      {user && (
        <div>
          <h3>Username: {user.username}</h3>
          <h4>Email: {user?.email}</h4>
          <img
            src={user.image}
            alt="user avatar"
            style={{ width: "150px", height: "auto" }}
          />
        </div>
      )}
      <UploadAvatar />
    </div>
  );
}

export default Profile;
