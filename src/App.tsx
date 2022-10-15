import './App.css';
import { useState } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddForm from './components/addForm/AddForm';
import Products from './components/Products/Products';
import { Product } from './datastructures';

function App() {
  const [itemList, setItemList] = useState([] as Array<Product>);
  if(itemList.length == 0)
  fetch("http://server.nygge.eu:4000/graphql?", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({query: `query {
        multipleItem {
          _id,
          name,
          location,
          amount,
          unit
        }
      }`})}).then((response) => response.json())
      .then((data) => {
        if(data.data.multipleItem)
         setItemList(data.data.multipleItem);
      });
  return (
    <div className="App">
      <header className="App-header">
        <img src="/assets/Logo.svg" alt="Logga"/>
        <div className='App-header-arch' />
      </header>
      <Container>
        <Row>
        <Col></Col>
        <Col></Col>
        <Col><AddForm /></Col>
      </Row>
          <Row>
            <Products data={itemList}/>
          </Row>
        </Container>
    </div>
  );
}

export default App;
