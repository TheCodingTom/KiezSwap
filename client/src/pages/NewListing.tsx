import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { ListingsContext } from "../context/ListingsContext";
import { baseUrl } from "../utils/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

function NewListing() {
  const { user } = useContext(AuthContext);
  const { getListings } = useContext(ListingsContext);

  const goToUserListings = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    district: "",
    category: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAttachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file instanceof File) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (isUploading) return;

    setIsUploading(true);

    if (
      !formData.name ||
      !formData.description ||
      !formData.district ||
      !formData.category
    ) {
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!selectedFile) {
      toast.error("Please upload an image.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      toast.error("Authentication error. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (user) {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("district", formData.district);
      form.append("category", formData.category);
      form.append("user", user._id);
      form.append("image", selectedFile);

      try {
        const response = await fetch(`${baseUrl}/api/listings/newlisting`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        });

        if (!response.ok) {
          throw new Error("Failed to add listing");
        }

        const result = await response.json();
        console.log(result);

        toast.success(
          "Listing added successfully! You'll be redirected in 3 seconds.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        getListings();
        setTimeout(() => {
          goToUserListings("/profile/userlistings");
        }, 3000);
      } catch (error) {
        console.error("Error uploading listing:", error);
        toast.error("Error uploading listing. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <>
      <h1>Add new listing</h1>

      <div className="form-container">
        <form className="new-listing-form">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Provide a brief description of the item and specify the listing type (swap or giveaway)."
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="district">
            <Form.Label>District</Form.Label>
            <Form.Select
              name="district"
              value={formData.district}
              onChange={handleInputChange}
            >
              <option value="">Select district...</option>
              <optgroup>
                <option value="Charlottenburg">Charlottenburg</option>
                <option value="Friedrichshain">Friedrichshain</option>
                <option value="Kreuzberg">Kreuzberg</option>
                <option value="Lichtenberg">Lichtenberg</option>
                <option value="Mitte">Mitte</option>
                <option value="Neukölln">Neukölln</option>
                <option value="Pankow">Pankow</option>
                <option value="Steglitz">Steglitz</option>
                <option value="Tempelhof">Tempelhof</option>
                <option value="Schoeneberg">Schöneberg</option>
                <option value="Treptow">Treptow</option>
              </optgroup>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select category...</option>
              <optgroup>
                <option value="Accessories">Accessories</option>
                <option value="Books">Books</option>
                <option value="Clothes">Clothes</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Games">Games</option>
                <option value="Movies">Movies</option>
                <option value="Vinyls">Vinyls</option>
                <option value="Other">Other</option>
              </optgroup>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Upload Image</Form.Label>
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
          <div className="addlisting-button">
            {imagePreview && formData ? (
              <Button onClick={handleFormSubmit}>
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            ) : (
              <Button disabled>Upload</Button>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default NewListing;
