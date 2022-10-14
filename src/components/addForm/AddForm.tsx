import React, { FC, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import styles from "./addForm.module.css";
import { Units } from "../../datastructures";
import { WithContext as ReactTags } from "react-tag-input";

interface AddFormProps {
  show?: boolean;
}
interface Tag {
  id: string,
  text: string
}
const AddForm: FC<AddFormProps> = (props: AddFormProps) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const [tags, setTags] = React.useState([] as Array<Tag>);
  const handleDelete = (i: number) => {
    console.log(tags.filter((tag, index) => index !== i));
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
    console.log(tag, tags);
  };
  return (
    <span>
      <Button className="p-2" variant="primary" onClick={handleShow}>
        Lägg till ny produkt +
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lägg till/Redigera produkt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Namn</Form.Label>
              <Form.Control type="text" placeholder="Toalettpapper" />
              <Form.Text className="text-muted">Namn på produkten.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Plats</Form.Label>
              <Form.Control type="text" placeholder="Kylskåp" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Antal</Form.Label>
              <Form.Control type="text" placeholder="3" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="unit">
              <Form.Label>Enhet</Form.Label>
              <Form.Select>
                <option value={Units.st}>st</option>
                <option value={Units.kg}>kilo</option>
                <option value={Units.g}>gram</option>
                <option value={Units.l}>liter</option>
                <option value={Units.ml}>milliliter</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <ReactTags
                tags={tags}
                delimiters={[188, 13]}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                inputFieldPosition="bottom"
                allowDragDrop={false}
                autocomplete
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
};

export default AddForm;
