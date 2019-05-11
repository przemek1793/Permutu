import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './Menu.css';
import { NavLink, withRouter} from "react-router-dom";


const electron = window.require('electron');
const remote = electron.remote;
var menu;

function ButtonM(props){
  return <div className="ButtonsM">
    <Button color="light" size="lg" onClick={props.click}>
      {props.text}
    </Button>
  </div>
}

function zamknij (props)
{
  if (process.platform !== 'darwin') { remote.app.exit(); }
}

class Menu extends Component {

  wczytajGre()
  {
    const dialog = window.require('electron').remote.dialog
    var file = dialog.showOpenDialog()
    const fs = window.require('fs');
    var zapis = JSON.parse(fs.readFileSync(file[0], 'utf8'));
    console.log(zapis);
    menu.props.history.push
    ({
      pathname: "/Gra",
      state: zapis
    })
  }

  render() {
    menu=this
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

export default withRouter(Menu);
