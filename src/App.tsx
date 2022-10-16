import "./App.css";
import { useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddForm from "./components/addForm/AddForm";
import Products from "./components/Products/Products";
import { Product } from "./datastructures";
import Search from "./components/Search/Search";
import FruitFall from "./components/FruitFall/FruitFall";

function App() {
  const [itemList, setItemList] = useState([] as Array<Product>);
  const [itemToEdit, setItemToEdit] = useState(undefined as Product|undefined);
  const [showAnimation, setShowAnimation] = useState(true);

  setTimeout(()=>{setShowAnimation(false)}, 4000);
  const openProduct = (item:Product)=>{
    setItemToEdit(item);
  };
  if (itemList.length == 0)
    fetch("http://server.nygge.eu:4000/graphql?", {
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
        if (data.data.multipleItem) setItemList(data.data.multipleItem);
      });
  return (
    <div className="App">
      <header className="App-header">
        <img src="/assets/Logo.svg" alt="Logga" />
        <div className="App-header-arch" />
      </header>
      <Search setList={setItemList} />
      <Container>
        <Row>
          <Products onClick={openProduct} data={itemList} />
        </Row>
        <Row className="pt-3">
        </Row>
      </Container>
      <footer style={{position:"sticky", bottom:"5px"}}>
        <AddForm loadData={itemToEdit} clearLoaded={()=>setItemToEdit(undefined)}/>
      </footer>
      {
       showAnimation && <FruitFall />
      }
    </div>
  );
}

export default App;
