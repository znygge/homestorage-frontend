import React, {useState} from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddForm from './components/addForm/AddForm';

function App() {
 
  return (
    <div className="App">
      <header className="App-header">
        <AddForm />
      </header>
    </div>
  );
}

export default App;
