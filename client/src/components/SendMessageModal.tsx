import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

type MessageModalProps = {
  listingId: string;
};

function SendMessageModal({ listingId }: MessageModalProps) {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const [confirmMessage, setConfirmMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };

  const createNewChat = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("listingId", listingId);
    urlencoded.append("text", message);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    const response = await fetch(
      "http://localhost:4000/api/chats/newChat",
      requestOptions
    );

    try {
      if (response) {
        const result = await response.json();
        console.log(result);
        setConfirmMessage("Message sent!");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Contact seller
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              {/* <Form.Label>Seller name?</Form.Label> */}
              <Form.Control
                onChange={handleInputText}
                as="textarea"
                placeholder="Write your message here!"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {confirmMessage ? (
            confirmMessage
          ) : (
            <Button variant="primary" onClick={createNewChat}>
              {" "}
              Send
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SendMessageModal;
