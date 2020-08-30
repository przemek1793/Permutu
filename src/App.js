import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Gra from './Gra'
import Menu from './Menu'
import PlayerNumberSelect from './PlayerNumberSelect'
import CzyAutomatyczna from './CzyAutomatyczna'


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Menu} />
        <Route path="/Menu" component={Menu} />
        <Route path="/Gra" component={Gra} />
        <Route path="/PlayerNumberSelect" component={PlayerNumberSelect} />
        <Route path="/CzyAutomatyczna" component={CzyAutomatyczna} />
      </Switch>  
    );
  }
}

export default App;
