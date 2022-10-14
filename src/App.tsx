import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddForm from './components/addForm/AddForm';
import Products from './components/Products/Products';

function App() {

  return (
    <div className="App">
      <header className="App-header">
      {/* <ReactLogo /> */}
      </header>
      <Container>
        <Row>
        <Col></Col>
        <Col></Col>
        <Col><AddForm /></Col>
      </Row>
          <Row>
            <Products />
          </Row>
        </Container>
    </div>
  );
}

export default App;
