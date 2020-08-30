import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Gra from './Gra'
import Menu from './Menu'


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Menu} />
        <Route path="/Menu" component={Menu} />
        <Route path="/Gra" component={Gra} />
      </Switch>  
    );
  }
}

export default App;
