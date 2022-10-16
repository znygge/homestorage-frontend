import React, { FC, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { NewProduct, Product, Units, UnitsString } from "../../datastructures";
import { WithContext as ReactTags } from "react-tag-input";

interface AddFormProps {
  show?: boolean;
  loadData?: Product;
  clearLoaded?:Function;
}
interface Tag {
  id: string;
  text: string;
}

const AddForm: FC<AddFormProps> = (props: AddFormProps) => {
  const [show, setShow] = useState(false);
  const [tags, setTags] = React.useState([] as Array<Tag>);
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [unit, setUnit] = React.useState(Units.st);

  useEffect(() => {
    if(props.loadData){
      setTags(props.loadData.tags.map((_id: string) => ({id:_id, text:_id} as any)));
      setName(props.loadData.name);
      setLocation(props.loadData.location);
      setAmount(props.loadData.amount);
      console.log(props.loadData.unit)
      setUnit(props.loadData.unit as Units);
      handleShow();
    }
  },[props.loadData]);
  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = () => {
    console.log(name, location, amount, unit, tags);
    const item: NewProduct = {
      name,
      location,
      amount,
      unit,
      tags: tags.map((tag) => tag.text),
    };
    fetch("http://server.nygge.eu:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation {
singleCreateItem(record: {
name: "${item.name}"
location:"${item.location}",
amount: ${item.amount},
unit: "${item.unit}",
tags: ${JSON.stringify(item.tags)}}) 
{
record {
name
location
amount
unit
category,
tags
}
}
}`
      }),
    }).then((resp) => {
      handleClose();
    });
  };
  const handleClose = () => {
    if(props.clearLoaded)
      props.clearLoaded();
    setName("");
    setLocation("");
    setAmount(0);
    setUnit(Units.st);
    setTags([] as Array<Tag>);
    setShow(false);
  };

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
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
              <Form.Control
                type="text"
                placeholder="Toalettpapper"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Plats</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kylskåp"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Antal</Form.Label>
              <Form.Control
                type="number"
                placeholder="3"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="unit">
              <Form.Label>Enhet</Form.Label>
              <Form.Select
                value={unit}
                onChange={(e) => setUnit(e.target.value as Units)}
              >
                <option value={Units.st}>{UnitsString.st}</option>
                <option value={Units.kg}>{UnitsString.kg}</option>
                <option value={Units.g}>{UnitsString.g}</option>
                <option value={Units.l}>{UnitsString.l}</option>
                <option value={Units.ml}>{UnitsString.ml}</option>
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
                placeholder="Lägg till taggar"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Avbryt
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Lägg till
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
};

export default AddForm;
