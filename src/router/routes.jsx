import React, { Component} from "react";
import { history } from '../statics';
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { About } from "../screens";
import Home from "../screens/Home"


export default function Routes() 
{
    return (
            <Router history={history}>
                <Switch>
                    <Route exact path= "/" component={Home}></Route>
                    <Route path="/about" component={About}></Route>
                </Switch>
            </Router>
        )
}