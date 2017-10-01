import React, { Component } from "react";
import logo from "../logo.svg";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

import Header from "./Header.js";
import Dashboard from "./Dashboard.js";
import Landing from "./Landing.js";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="App container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
/*
mapStateToProps() => {

}

mapDispatchToProps() => {

}
*/

export default connect(null, actions)(App);
