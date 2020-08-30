import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './PlayerSelect.css';
import { NavLink, withRouter} from "react-router-dom";


function ButtonM(props){
  return <div className="ButtonsM">
    <Button color="light" size="lg" onClick={props.click}>
      {props.text}
    </Button>
  </div>
}

class PlayerSelect extends Component {

  render() {
    return (
      <div className="Menu">
        <header className="Menu-header">
          <p>
            Permutu
          </p>
        </header>
        <div className="MenuButtons">
          <div className="ButtonLink">
            <Button color="light" size="lg" >
              <NavLink to="/Gra" style={{textDecoration: 'none', color:'black' }}>Graj w Permutu</NavLink>
            </Button>
          </div>
          <ButtonM text="Wczytaj grę"  click={this.wczytajGre}/>
          <ButtonM text="Statystyki" />
          <ButtonM text="Zamknij aplikacje" click={zamknij}/>
        </div>
      </div>
    );
  }
}

export default PlayerSelect(Menu);
