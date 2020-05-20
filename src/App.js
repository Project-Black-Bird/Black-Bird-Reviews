import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import routes from "./routes";
import logo from "./logo.svg";
import "./App.css";
import AuthModal from "./Components/Modal/AuthModal";

function App() {
  return (
    <div className="App">
      <Navbar />
      {routes}
    </div>
  );
}

export default App;
