import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { baseUrl } from "../utils/baseUrl";

type MessageModalProps = {
  listingId: string;
};

function SendMessageModal({ listingId }: MessageModalProps) {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const [confirmMessage, setConfirmMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

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

    console.log("isSending :>> ", isSending);
    if (isSending) return;

    setIsSending(true);

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

    try {
      const response = await fetch(
        `${baseUrl}/api/chats/newChat`,
        requestOptions
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setConfirmMessage("Message sent!");
        setMessage("");
      }
    } catch (error) {
      console.log("error :>> ", error);
    } finally {
      setIsSending(false);
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
          {confirmMessage && <div>{confirmMessage}</div>}
          <Button
            variant="primary"
            onClick={createNewChat}
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SendMessageModal;
