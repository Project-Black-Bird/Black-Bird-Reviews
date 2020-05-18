import React from 'react';
import Navbar from "./Components/Navbar/Navbar";
import routes from "./routes";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      {routes}
    </div>
  );
}

export default App;
