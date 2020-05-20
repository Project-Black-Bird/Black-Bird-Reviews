import React, { Component } from 'react';
import './Login.scss';
import axios from 'axios';

import { connect } from 'react-redux';

import { getUser } from '../../redux/reducer';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			verPassword: '',
			picture: '',
			registerView: false,
		};
	}

	componentDidMount() {
		if (this.props.user.email) {
			this.props.history.push('/profile');
		}
	}

	handleInput = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleToggle = () => {
		this.setState({ registerView: !this.state.registerView });
	};

	handleRegister = () => {
		const { username, email, password, verPassword, picture } = this.state;
		if (password !== '' && password === verPassword) {
			axios
				.post('/api/auth/register', { username, email, password, picture }, {withCredentials: true})
				.then(res => {
					//set user in redux or local state
					this.props.getUser(res.data);
					//route user to the dashboard
					this.props.history.push('/');
				})
				.catch(err => console.log(err));
		} else {
			alert('Please verify your password again');
		}
	};

	handleLogin = () => {
		const { email, password } = this.state;
		axios
			.post('/api/auth/login', { email, password }, {withCredentials: true})
			.then(res => {
				//set user to redux or local state
				this.props.getUser(res.data);
				//route the user to dashboard
				this.props.history.push('/');
			})
			.catch(err => console.log(err));
	};

	render() {
		// console.log(this.props);
		return (
			<div className="login-container">
				<section className="authentication-info">
					{this.state.registerView ? (
						<>
							<h3>Register for an account</h3>
							<input
								value={this.state.username}
								name="username"
								placeholder="Username"
								onChange={e => this.handleInput(e)}
							/>
						</>
					) : (
						<h3>Log In</h3>
					)}
					<input
						value={this.state.email}
						name="email"
						placeholder="Email"
						onChange={e => this.handleInput(e)}
					/>
					<input
						type="password"
						value={this.state.password}
						name="password"
						placeholder="Password"
						onChange={e => this.handleInput(e)}
					/>
					{this.state.registerView ? (
						<>
							<input
								type="password"
								value={this.state.verPassword}
								name="verPassword"
								placeholder="Verify Password"
								onChange={e => this.handleInput(e)}
							/>
							<input
								value={this.state.picture}
								name="picture"
								placeholder="Profile image URL"
								onChange={e => this.handleInput(e)}
							/>
							<button onClick={this.handleRegister}>Submit</button>
							<p>
								Have an account?{' '}
								<span onClick={this.handleToggle}>Log In Here</span>
							</p>
						</>
					) : (
						<>
							<button onClick={this.handleLogin}>Log In</button>
							<p>
								Don't have an account?{' '}
								<span onClick={this.handleToggle}>Register Here</span>
							</p>
						</>
					)}
				</section>
			</div>
		);
	}
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser })(Login);
