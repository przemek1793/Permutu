import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Gra from './Gra'
import Menu from './Menu'
import PlayerNumberSelect from './PlayerNumberSelect'


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Menu} />
        <Route path="/Menu" component={Menu} />
        <Route path="/Gra" component={Gra} />
        <Route path="/PlayerNumberSelect" component={PlayerNumberSelect} />
      </Switch>  
    );
  }
}

export default App;
