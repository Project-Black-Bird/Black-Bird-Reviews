import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import Posts from "./Components/Posts/Posts";
export default (
  <Switch>
    <Route exact path="/" component={Posts} />
    <Route path="/login" component={Profile, Login} />
    <Route path="/profile" component={Profile} />
  </Switch>
);
