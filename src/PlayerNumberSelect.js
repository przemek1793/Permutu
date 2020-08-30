import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './Menu.css';
import { NavLink, withRouter} from "react-router-dom";

const electron = window.require('electron');
var playerNumberSelect;

function ButtonM(props){
    return <div className="ButtonsM">
      <Button color="light" size="lg" onClick={props.click}>
        {props.text}
      </Button>
    </div>
}

class PlayerNumberSelect extends Component {

    constructor(props) {
        super(props);
        playerNumberSelect=this;
    }

    dwochGraczy()
    {
        var stan={
            dane:[]
          }
        stan.dane.push({ileGraczy:2, czyAutomat:playerNumberSelect.props.location.state, czyNowaGra:1});
        playerNumberSelect.props.history.push(
        {
            pathname: "/Gra",
            state: stan
        })
    }

    trzechGraczy()
    {
        var stan={
            dane:[]
          }
        stan.dane.push({ileGraczy:3, czyAutomat:playerNumberSelect.props.location.state, czyNowaGra:1});
        playerNumberSelect.props.history.push(
        {
            pathname: "/Gra",
            state: stan
        })
    }

    czterechGraczy()
    {
        var stan={
            dane:[]
          }
        stan.dane.push({ileGraczy:4, czyAutomat:playerNumberSelect.props.location.state, czyNowaGra:1});
        playerNumberSelect.props.history.push(
        {
            pathname: "/Gra",
            state: stan
        })
    }

    render() {
        return (
          <div className="Menu">
            <header className="Menu-header">
              <p>
                Wybierz ilość graczy
              </p>
            </header>
            <div className="MenuButtons">
            <ButtonM text="2"  click={this.dwochGraczy}/>
            <ButtonM text="3"  click={this.trzechGraczy}/>
            <ButtonM text="4"  click={this.czterechGraczy}/>
              <div className="ButtonLink">
                <Button color="light" size="lg" >
                  <NavLink to="/Menu" style={{textDecoration: 'none', color:'black' }}>Powrót do menu</NavLink>
                </Button>
              </div>
            </div>
          </div>
        );
      }
}


export default withRouter(PlayerNumberSelect);