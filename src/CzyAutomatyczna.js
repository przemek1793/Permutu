import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './Menu.css';
import { NavLink, withRouter} from "react-router-dom";

const electron = window.require('electron');
var czyAutomat;

function ButtonM(props){
    return <div className="ButtonsM">
      <Button color="light" size="lg" onClick={props.click}>
        {props.text}
      </Button>
    </div>
}

class CzyAutomatyczna extends Component {

    normalna()
    {
        czyAutomat.props.history.push(
        {
            pathname: "/PlayerNumberSelect",
            state: 'normalna'
        })
    }

    automat()
    {
        czyAutomat.props.history.push(
        {
            pathname: "/PlayerNumberSelect",
            state: 'automat'
        })
    }

    render() {
        czyAutomat=this
        return (
          <div className="Menu">
            <header className="Menu-header">
              <p>
                Wybierz typ gry
              </p>
            </header>
            <div className="MenuButtons">
            <ButtonM text="Normalna gra"  click={this.normalna}/>
            <ButtonM text="Gra automatyczna"  click={this.automat}/>
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


export default withRouter(CzyAutomatyczna);