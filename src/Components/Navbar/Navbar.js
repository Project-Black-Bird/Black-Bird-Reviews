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
            <Link
              to="/login"
              className="nav-links"
              onClick={() => this.handleToggle}
            >
              Log In
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><title>ic_person_outline_48px</title><g fill="#ffffff"><path d="M21.06 10.35a3.69 3.69 0 1 1 0 7.38 3.69 3.69 0 0 1 0-7.38m0 15.8c5.22 0 10.71 2.55 10.71 3.68v1.94h-21.42v-1.93c0-1.13 5.49-3.69 10.71-3.69m0-19.13c-3.87 0-7.02 3.15-7.02 7.02s3.15 7.02 7.02 7.02 7.02-3.15 7.02-7.02-3.15-7.02-7.02-7.02z m0 15.8c-4.68 0-14.04 2.34-14.04 7.02v5.26h28.08v-5.26c0-4.68-9.36-7.02-14.04-7.02z"></path></g></svg>
            </Link>
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
