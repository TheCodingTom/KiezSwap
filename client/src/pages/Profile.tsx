import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import UploadAvatar from "../components/UploadAvatar";
import GooeyNav from "../components/GooeyNavItem";

function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const items = [{ label: "Home" }, { label: "About" }, { label: "Contact" }];

  return (
    <div>
      <div style={{ height: "600px", position: "relative" }}>
        <GooeyNav
          items={items}
          animationTime={600}
          pCount={15}
          minDistance={20}
          maxDistance={42}
          maxRotate={75}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          timeVariance={300}
        />
      </div>
      <div className="profile-container">
        {user && (
          <div className="profile-container">
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
    </div>
  );
}

export default Profile;
