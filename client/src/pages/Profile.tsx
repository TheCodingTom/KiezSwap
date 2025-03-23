import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import UploadAvatar from "../components/UploadAvatar";
import "../styles/Profile.css";

function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <div className="profile-container">
        {user && (
          <div className="profile-container">
            <h3>Username: {user.username}</h3>
            <h4>Email: {user?.email}</h4>
            <img
              src={user.image}
              className="avatar-picture"
              alt="user avatar"
              style={{ width: "150px", height: "auto" }}
            />
          </div>
        )}
        <UploadAvatar />
      </div>
    </div>
  );
}

export default Profile;
