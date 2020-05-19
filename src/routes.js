import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';

export default (
	<Switch>
		<Route exact path="/" />
		<Route path="/login" component={Login} />
	</Switch>
);
