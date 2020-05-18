import React from 'react';
import { Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";


export default (
    <Switch>
        {/* <Route exact path="/" component={Landing} /> */}
        <Route path="/login" />
    </Switch>
)
