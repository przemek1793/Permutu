import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './Menu.css';
import { NavLink, withRouter} from "react-router-dom";

const electron = window.require('electron');
const remote = electron.remote;
var playerNumberSelect;


function ButtonM(props){
    return <div className="ButtonsM">
      <Button color="light" size="lg" onClick={props.click}>
        {props.text}
      </Button>
    </div>
}

class PlayerNumberSelect extends Component {

    dwochGraczy()
    {
        playerNumberSelect.props.history.push(
        {
            pathname: "/Gra",
            state: 2
        })
    }

    trzechGraczy()
    {
        playerNumberSelect.props.history.push(
        {
            pathname: "/Gra",
            state: 3
        })
    }

    czterechGraczy()
    {
        playerNumberSelect.props.history.push(
        {
            pathname: "/Gra",
            state: 4
        })
    }

    render() {
        playerNumberSelect=this
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