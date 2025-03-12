import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

type UserModalType = {
  email: string;
  username: string;
  _id: string;
};

type UserModalProps = {
  user: UserModalType;
};

function UserModal({ user }: UserModalProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="open-modal-button" onClick={handleShow}>
        Posted by: {user.username}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserModal;
