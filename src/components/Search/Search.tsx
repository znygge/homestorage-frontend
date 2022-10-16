import React, { FC, useRef } from "react";
import styles from "./Search.module.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Product } from "../../datastructures";
import Fuse from 'fuse.js'

interface SearchProps {
  setList: React.Dispatch<React.SetStateAction<Product[]>>;
}
const options = {
  includeScore: true,
  threshold: 0.3,
  keys: [
    {
      name: 'name',
      weight: 0.7
    },
    {
      name: 'tags',
      weight: 0.7
    },
    {
      name: 'location',
      weight: 0.5
    },
    {
      name: 'unit',
      weight: 0.5
    }
  ]
}

const Search: FC<SearchProps> = (props) => {
  const searchfield = useRef(null);
  const search = () => {
    if (!searchfield.current) return;
    const searchWord = (searchfield.current as HTMLInputElement).value;
    fetch("http://server.nygge.eu:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          multipleItem {
            _id,
            name,
            location,
            amount,
            unit,
            tags
          }
            }`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const itemList: Array<Product> = [];
        if(searchWord){
          const fuse = new Fuse(data.data.multipleItem, options)
          const result = fuse.search(searchWord);
          result.forEach(res=>{if(res.item)itemList.push(res.item as Product)});
        }
        props.setList(searchWord?itemList:data.data.multipleItem);
      });
  };

  return (
    <InputGroup  className="p-3 pt-0" style={{ fontSize: "18pt" , position:"sticky", top:"6px"}}>
      <Form.Control
        style={{
          borderColor: "#7EC984 !important",
          backgroundColor: "#88C78D21",
          fontWeight: "bold",
          lineHeight: "32px",
        }}
        placeholder="Mjölk"
        aria-label="Sökfält"
        ref={searchfield}
        aria-describedby="basic-addon2"
      />
      <Button
        variant="primary"
        className="shadow-none"
        id="button-addon2"
        onClick={search}
      >
        Sök
      </Button>
    </InputGroup>
  );
};
export default Search;
