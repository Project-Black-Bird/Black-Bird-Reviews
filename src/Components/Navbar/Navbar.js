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
							onClick={() => this.handleToggle}>
							Login/Register
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
