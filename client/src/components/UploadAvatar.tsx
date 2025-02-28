import React, { useContext, useState } from "react";
import {
  ImageUploadOkResponse,
  UserRegisterFormType,
} from "../types/customTypes";
import { AuthContext } from "../context/AuthContext";

function UploadAvatar() {
const {user} = useContext(AuthContext)

  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<UserRegisterFormType | null>(null);

  const handleAttachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const file = e.target.files?.[0];

    if (file instanceof File) {
      // if our document/image matches the File type the function will run
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(); // append everything here - username,email,password,image
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/uploadImage",
        requestOptions
      );
      const result = (await response.json()) as ImageUploadOkResponse;

      setNewUser({ ...newUser!, image: result.imageURL }); // we don't know what's already inside newUser (email etc.) so we use spread operator to add the image
      console.log("result :>> ", result);
    } catch (error) {
      console.log("error :>> ", error);
    } finally {
      if (typeof imagePreview === "string") {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
    }
  };
  return (
    <>
      <div className="form-container">
        <form
          action="submit"
          className="register-form"
          onSubmit={handleImageUpload}
        >
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleAttachFile}
          />
          <button>Upload image</button>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview of avatar image"
              style={{ width: "100px" }}
            />
          )}
        </form>
      </div>

      <div>
        {user && 
         <div>
          <h3>Username: {user.username}</h3>
           <img
            src={user.image}
            alt="avatar image"
            style={{ width: "200px" }}
          />
         </div>
        }
      </div>
    </>
  );
}

export default UploadAvatar;
