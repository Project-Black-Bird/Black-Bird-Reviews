import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Navbar.scss';

// import { connect } from 'react-redux';
// import AuthModal from '../Modal/AuthModal';


class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownView: false,
			// showModal: false,
		};
    }
    
	handletoggle = () => {
		this.setState({ dropdownView: !this.state.dropdownView });
		// this.setState({ showModal: !this.state.showModal });
	};

	render() {
		return (
      <div className="nav-container">
        <h1>
          <Link to="/" className="nav-logo">
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
          <h1>
            {/* <Link to="/" className="nav-logo">
						Blackbird Reviews
					</Link> */}
            <Link
              to="/login"
              className="nav-links"
              onClick={() => this.handleToggle}
            >
              {/* Log In/Register */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
              >
                <title>ic_person_outline_48px</title>
                <g fill="#ffffff">
                  <path d="M24 11.8c2.32 0 4.2 1.88 4.2 4.2s-1.88 4.2-4.2 4.2-4.2-1.88-4.2-4.2 1.88-4.2 4.2-4.2m0 18c5.95 0 12.2 2.91 12.2 4.2v2.2H11.8V34c0-1.29 6.25-4.2 12.2-4.2M24 8c-4.42 0-8 3.58-8 8 0 4.41 3.58 8 8 8s8-3.59 8-8c0-4.42-3.58-8-8-8zm0 18c-5.33 0-16 2.67-16 8v6h32v-6c0-5.33-10.67-8-16-8z"></path>
                </g>
              </svg>
            </Link>
            {/* <Link
							to="/profile"
							className="nav-links"
							onClick={() => this.handleToggle}>
							Profile
						</Link> */}
          </h1>
        </nav>
        {/* {this.state.showModal ? (
					<AuthModal toggleFn={this.handleToggle} />
				) : null} */}
      </div>
    );
	}
}

export default withRouter(Navbar);
// const mapStateToProps = reduxState => reduxState;

// export default connect(mapStateToProps)(Navbar);
