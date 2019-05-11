import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { NavLink } from "react-router-dom";
import './Gra.css';
import GameGrid from "./GameGrid"
import PlayerGrid from "./PlayerGrid"

var  gracz1 = [];
var  gracz2 = [];
var  gracz3 = [];
var  gracz4 = [];
var gra;


class Gra extends Component {

  constructor(props) {
    super(props);
    console.log(this)
    if (props.location.state===undefined)
    {
      console.log("nie ma propsów")
    }
    else
    {
      console.log("są propsy")
    }
    //tura 1 gracza
    this.state = { 
      player: 1, 
      ostatniKlocek: [],
    };

    //czyszczenie tablic klocków graczy
    gracz1 = [];
    gracz2 = [];
    gracz3 = [];
    gracz4 = [];
    var ostatni1="",ostatni2="",ostatni3="",ostatni4="";
    this.state.ostatniKlocek.push (ostatni1,ostatni2,ostatni3,ostatni4)
    this.plansza = React.createRef();
}

  przelozSymbol(symbol, kolor, kolumna){

    //dodawanie klocka do tabeli
    var klocek=kolor+symbol
    var aktualny=gra.state.ostatniKlocek;
    switch(gra.state.player)
    {
      case 1: 
      {
        gracz1.push(klocek)
        aktualny[0]=klocek+kolumna
        gra.setState({ ostatniKlocek: aktualny }) 
        break
      }
      case 2: 
      {
        gracz2.push(klocek)
        aktualny[1]=klocek+kolumna
        gra.setState({ ostatniKlocek: aktualny }) 
        break
      }
      case 3: 
      {
        gracz3.push(klocek)
        aktualny[2]=klocek+kolumna
        gra.setState({ ostatniKlocek: aktualny }) 
        break
      }
      case 4: 
      {
        gracz4.push(klocek)
        aktualny[3]=klocek+kolumna
        gra.setState({ ostatniKlocek: aktualny }) 
        break
      }
      default:
      {
        break
      }
    }

    //ustawienie w stanie czyja jest tura
    //przerobić potem żeby == było równe liczbie graczy
    if (gra.state.player===4)
    {
      gra.setState({ player: 1 }) 
    }
    else
    {
      gra.setState({player: ++gra.state.player}) 
    }
  }

  zapiszGre()
  {
    var zapis={
      dane:[]
    }
    //console.log(this.plansza.current.kolumny.current);
    zapis.dane.push({player1:gracz1, player2:gracz2, player3:gracz3, player4:gracz4, poprzednieRuchy: gra.state.ostatniKlocek, tura:gra.state.player});//, aktualneUstawienie:plansza
    var kolumny=[];
    for (var i=1;i<27;i++)
    {
      var temp=[];
      //zapisz po kolei symbole w kolumnie i informacje czy pokazywać symbol
      temp.push({red:this.plansza.current.kolumny[i].current.state.redSymbol});
      temp.push({showRed:this.plansza.current.kolumny[i].current.state.showRed});
      temp.push({black:this.plansza.current.kolumny[i].current.state.blackSymbol});
      temp.push({showBlack:this.plansza.current.kolumny[i].current.state.showBlack});
      temp.push({green:this.plansza.current.kolumny[i].current.state.greenSymbol});
      temp.push({showGreen:this.plansza.current.kolumny[i].current.state.showGreen});
      kolumny.push(temp);
      
    }
    zapis.dane.push({stanPlanszy: kolumny});
    var json = JSON.stringify(zapis);

    const dialog = window.require('electron').remote.dialog
    dialog.showSaveDialog({
      filters: [{
        name: 'JSON',
        extensions: ['json']
      }]
    },(fileName) => {
      if (fileName === undefined){
          console.log("Nie zapisano gry");
          return;
      }

      var fs = window.require('fs');
      fs.writeFile(fileName, json, 'utf8', (err) => {
          if(err){
              alert("Bląd przy zapisywaniu "+ err.message)
          }
          alert("Gra została zapisana");
      });
  }); 
  }

  render() {
    gra=this;
    var ostatniRuch=[]
    for (var i=0;i<4;i++)
    {
      ostatniRuch.push(<p className="Stan-tekst">Ostatni ruch gracza {i+1}</p>)
      if (this.state.ostatniKlocek[i]!=="")
      {
        //czy numer kolumny jest 1 czy 2 cyfrowy
        if (this.state.ostatniKlocek[i].length===3)
        {
         ostatniRuch.push(<img src={require('./symbole/'+this.state.ostatniKlocek[i].slice(0,-1)+'.png')} alt={this.state.ostatniKlocek[i].slice(0,-1)}/>)
         ostatniRuch.push(<p className="Stan-tekst">w kolumnie {this.state.ostatniKlocek[i].slice(-1)}</p>)
        }
      
        else
        {
          ostatniRuch.push(<img src={require('./symbole/'+this.state.ostatniKlocek[i].slice(0,-2)+'.png')} alt={this.state.ostatniKlocek[i].slice(0,-2)}/>)
          ostatniRuch.push(<p className="Stan-tekst">w kolumnie {this.state.ostatniKlocek[i].slice(-2)}</p>)
        }
     }
    }
    
    return (
      <div className="Gra">
        <p className="Gracz">
            Obecnie ruch wykonuje gracz {this.state.player}
        </p>
        <GameGrid metodaPrzekladania={this.przelozSymbol} ref={this.plansza} ></GameGrid>
        <p className="Gracz">
            Gracz 1
        </p>
        <PlayerGrid player={1} symbole={gracz1}></PlayerGrid>
        <p className="Gracz">
            Gracz 2
        </p>
        <PlayerGrid player={2} symbole={gracz2}></PlayerGrid>
        <p className="Gracz">
            Gracz 3
        </p>
        <PlayerGrid player={3} symbole={gracz3}></PlayerGrid>
        <p className="Gracz">
            Gracz 4
        </p>
        <PlayerGrid player={4} symbole={gracz4}></PlayerGrid>
        <div className="Stan">
          {ostatniRuch}
        </div>
        <Button color="light" size="lg" style={{textDecoration: 'none', color:'black' }}  onClick={() => {this.zapiszGre()}}>Zapisz grę</Button>
          <Button color="light" size="lg" >
              <NavLink to="/Menu" style={{textDecoration: 'none', color:'black' }}>Powrót do menu</NavLink>
          </Button>
        </div>
    );
  }
}

export default Gra;
