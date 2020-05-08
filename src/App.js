import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Alert, Badge } from 'reactstrap';

function App() {
  return (
    <div >
      <Alert color="primary">
        This is an alert message.
      </Alert>
 <h1>Heading <Badge color="secondary">New</Badge></h1>
    </div>
  );
}

export default App;
