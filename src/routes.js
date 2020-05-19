import React from 'react';
<<<<<<< HEAD
import { Switch, Route } from "react-router-dom";

=======
import { Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
>>>>>>> master

export default (
	<Switch>
		<Route exact path="/" />
		<Route path="/login" component={Login} />
	</Switch>
);
