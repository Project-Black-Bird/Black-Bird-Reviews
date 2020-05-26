import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import routes from "./routes";
import logo from "./logo.svg";
import { connect } from "react-redux";
import { getUser } from "./redux/reducer";
import "./App.css";
import AuthModal from "./Components/Modal/AuthModal";
import Axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    Axios.get("/api/auth/user").then((response) => {
      this.props.getUser(response.data || {});
    });
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        {routes}
      </div>
    );
  }
}

export default connect(
  () => {
    return {};
  },
  { getUser }
)(App);
