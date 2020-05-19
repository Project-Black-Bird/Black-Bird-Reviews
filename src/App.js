import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import routes from './routes';
import logo from './logo.svg';
import './App.css';
import AuthModal from './Components/Modal/AuthModal';
import CommentForm from './Components/Comment/CommentForm';

function App() {
	return (
		<div className="App">
			<Navbar />
			<CommentForm />
			{routes}
		</div>
	);
}

export default App;
