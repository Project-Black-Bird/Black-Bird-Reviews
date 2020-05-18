import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownView: false,
    };
  }

  handletoggle = () => {
    this.setState({ dropdownView: !this.state.dropdownView });
  };

  render() {
    return (
      <div className="nav-container">
        <h1>
          <Link to="/" className="nav-links">
            Blackbird Reviews
          </Link>
        </h1>
        {/* <div className="nav-dropdown" onClick={this.handletoggle}>
          ☰
        </div>
        {this.state.dropdownView ? (
          <nav onClick={this.handleToggle} className="dropdown-menu">
            <span>
              <Link to="/login" className="drop-links">
                Login/Register
              </Link>
            </span>
          </nav>
        ) : null} */}
        <nav className="desktop-links">
          <span>
            <Link to="/login" className="nav-links">
              Login/Register
            </Link>
          </span>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);

