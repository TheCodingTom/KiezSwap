import React, { useContext, useState } from "react";
import { ImageUploadOkResponse } from "../types/customTypes";
import { AuthContext } from "../context/AuthContext";
import { baseUrl } from "../utils/baseUrl";
import { Button, Form } from "react-bootstrap";

function UploadAvatar() {
  const { user, checkUserStatus } = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAttachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const file = e.target.files?.[0];

    if (file instanceof File) {
      // if our document/image matches the File type the function will run
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (isUploading) return;

    setIsUploading(true);

    const formdata = new FormData();
    formdata.append("image", selectedFile);
    if (user) {
      formdata.append("userId", user?._id);
    }

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/uploadImage`,
        requestOptions
      );
      const result = (await response.json()) as ImageUploadOkResponse;
      checkUserStatus(); // updates user avatar after uploading the new pic
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
    <form action="submit" className="avatar-form">
      <Form.Group controlId="image">
        <Form.Label>
          <h4>Change your avatar</h4>
        </Form.Label>
        <Form.Control
          type="file"
          name="image"
          accept="image/*"
          onChange={handleAttachFile}
        />
      </Form.Group>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="preview of avatar image"
          style={{ width: "100px" }}
        />
      )}
      <div>
        {imagePreview ? (
          <Button onClick={handleImageUpload}>
            {" "}
            {isUploading ? "Uploading..." : "Upload image"}
          </Button>
        ) : (
          <Button disabled>Upload image</Button>
        )}
      </div>
    </form>
  );
}

export default UploadAvatar;
