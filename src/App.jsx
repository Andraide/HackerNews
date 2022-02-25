import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Routes from "./router/routes";


function App() {
    return(
        <Routes />    
    );
}


export default hot(module)(App);