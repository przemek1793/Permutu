import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { NavLink, withRouter} from "react-router-dom";
import './Gra.css';
import GameGrid from "./GameGrid"
import PlayerGrid from "./PlayerGrid"

var  gracz1 = [];
var  gracz2 = [];
var  gracz3 = [];
var  gracz4 = [];
var gra;


class Gra extends Component {
//error handling przy wczytywaniu złego jsona
  constructor(props) {
    super(props);
    if (props.location.state===undefined)
    {
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
    }
    else
    {
      try 
      {
        this.state = { 
          player: props.location.state.dane[0].tura, 
          ostatniKlocek: props.location.state.dane[0].poprzednieRuchy,
        };
        gracz1 = props.location.state.dane[0].player1;
        gracz2 = props.location.state.dane[0].player2;
        gracz3 = props.location.state.dane[0].player3;
        gracz4 = props.location.state.dane[0].player4;
      } 
      catch (e) 
      {
        this.state = { 
          hasError:true
        };
      }
    }
    this.plansza = React.createRef();
    this.panelGracza1 = React.createRef();
    this.panelGracza2 = React.createRef();
    this.panelGracza3 = React.createRef();
    this.panelGracza4 = React.createRef();
}

  przelozSymbol(wybranyKolor, kolumna, stanKolumny){
    var wybranySymbol
    switch(wybranyKolor)
    {
      case 'r': 
      {
        wybranySymbol=stanKolumny.redSymbol
        break
      }
      case 'b': 
      {
        wybranySymbol=stanKolumny.blackSymbol 
        break
      }
      case 'g': 
      {
        wybranySymbol=stanKolumny.greenSymbol
        break
      }
      default:
      {
        break
      }
    }

    //todo: sprawdzenie czy w ogóle można przełożyć klocek
    //funkcja zwraca 3 możliwe wartości: 0 - nie przekładać klocka, 1- przełożyć 1 klocek 2-przełożyć kolumne
    var wartośćZwrotna=0
    //pierwsza zasada: Możesz wziąć dokładnie jeden klocek, jeśli spełnia on dwa warunki:
    //1. ani Ty ani przeciwnik nie ma jeszcze klocka z takim symbolem,
    //2. klocek ten leży w kolumnie zawierającej 3 klocki. 
    //klocek leży w kolumnie zawierającej 3 klocki 
    if (stanKolumny.showRed&&stanKolumny.showBlack&&stanKolumny.showGreen)
    {
      var czyZnaleziono=false
      var temp=gra.panelGracza1.current.state.symbole
      for (var i=0; i<temp.length;i++)
      {
        if(temp[i].length>0)
        {
          if (temp[i][0].charAt(1)===wybranySymbol)
          {
            czyZnaleziono=true
            break;
          }
        }
      }
      if (!czyZnaleziono)
      {
        temp=gra.panelGracza2.current.state.symbole
        for (var i=0; i<temp.length;i++)
        {
          if(temp[i].length>0)
          {
            if (temp[i][0].charAt(1)===wybranySymbol)
            {
              czyZnaleziono=true
              break;
            }
          }
        }
      }
      if (!czyZnaleziono)
      {
        temp=gra.panelGracza3.current.state.symbole
        for (var i=0; i<temp.length;i++)
        {
          if(temp[i].length>0)
          {
            if (temp[i][0].charAt(1)===wybranySymbol)
            {
              czyZnaleziono=true
              break;
            }
          }
        }
      }
      if (!czyZnaleziono)
      {
        temp=gra.panelGracza4.current.state.symbole
        for (var i=0; i<temp.length;i++)
        {
          if(temp[i].length>0)
          {
            if (temp[i][0].charAt(1)===wybranySymbol)
            {
              czyZnaleziono=true
              break;
            }
          }
        }
      }
      if (!czyZnaleziono)
      {
        wartośćZwrotna=1
      }
    }

    //druga zasada: Możesz wziąć całą kolumnę (a w kolumnie mogą leżeć 2 lub 3 klocki):
    //- jeśli masz już wszystkie symbole leżące w tej kolumnie
    //- lub jeśli dokładnie jeden klocek w tej kolumnie ma symbol, którego nie masz. 
    var ileBrakuje=0
    var temp
    switch(gra.state.player)
    {
      case 1: 
      {
        temp=gra.panelGracza1.current.state.symbole
        break
      }
      case 2: 
      {
        temp=gra.panelGracza2.current.state.symbole
        break
      }
      case 3: 
      {
        temp=gra.panelGracza3.current.state.symbole
        break
      }
      case 4: 
      {
        temp=gra.panelGracza4.current.state.symbole
        break
      }
      default:
      {
        break
      }
    }
    //sprawdzenie czy są przynajmniej 2 klocki w kolumnie
    if (stanKolumny.showRed+stanKolumny.showBlack+stanKolumny.showGreen>1)
    {
      if (stanKolumny.showRed)
      {
        var czyZnaleziono=false
        for (var i=0; i<temp.length;i++)
        {
          if(temp[i].length>0)
          {
            if (temp[i][0].charAt(1)===stanKolumny.redSymbol)
            {
              czyZnaleziono=true
              break;
            }
          }
        }
        if (!czyZnaleziono)
        {
          ileBrakuje++
        }
      }
      if (stanKolumny.showBlack)
      {
        var czyZnaleziono=false
        for (var i=0; i<temp.length;i++)
        {
          if(temp[i].length>0)
          {
            if (temp[i][0].charAt(1)===stanKolumny.blackSymbol)
            {
              czyZnaleziono=true
              break;
            }
          }
        }
        if (!czyZnaleziono)
        {
          ileBrakuje++
        }
      }
      if (stanKolumny.showGreen)
      {
        var czyZnaleziono=false
        for (var i=0; i<temp.length;i++)
        {
          if(temp[i].length>0)
          {
            if (temp[i][0].charAt(1)===stanKolumny.greenSymbol)
            {
              czyZnaleziono=true
              break;
            }
          }
        }
        if (!czyZnaleziono)
        {
          ileBrakuje++
        }
      }
      if (ileBrakuje<2)
      {
        wartośćZwrotna=2
      }
    }
   

    //dodawanie klocka do tabeli
    var klocek
    switch(wybranyKolor)
    {
      case 'r': 
      {
        klocek='r'+stanKolumny.redSymbol
        break
      }
      case 'b': 
      {
        klocek='b'+stanKolumny.blackSymbol
        break
      }
      case 'g': 
      {
        klocek='g'+stanKolumny.greenSymbol
        break
      }
      default:
      {
        break
      }
    }
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
    console.log(wartośćZwrotna)
    return wartośćZwrotna
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
    if (this.state.hasError)
    {
      return <div className="Gra">
        <h1 className="Error">Wczytano niepoprawny plik.</h1>
        <Button color="light" size="lg" >
            <NavLink to="/Menu" style={{textDecoration: 'none', color:'black' }}>Powrót do menu</NavLink>
        </Button>
      </div>
    }
    gra=this;
    var ostatniRuch=[]
    for (var i=0;i<4;i++)
    {
      ostatniRuch.push(
      <li key={"Stan-tekst"+(i+1)} className="Stan-tekst">
        Ostatni ruch gracza {i+1}
      </li>)
      if (this.state.ostatniKlocek[i]!=="")
      {
        //czy numer kolumny jest 1 czy 2 cyfrowy
        if (this.state.ostatniKlocek[i].length===3)
        {
         ostatniRuch.push(
          <li key={"symbol"+(i+1)}>
            <img src={require('./symbole/'+this.state.ostatniKlocek[i].slice(0,-1)+'.png')} alt={this.state.ostatniKlocek[i].slice(0,-1)}/>
          </li>
         )
         ostatniRuch.push(
           <li key={"kolumna"+(i+1)} className="Stan-tekst">
              w kolumnie {this.state.ostatniKlocek[i].slice(-1)}
            </li>
         )
        }
      
        else
        {
          ostatniRuch.push(
            <li key={"symbol"+(i+1)}>
              <img src={require('./symbole/'+this.state.ostatniKlocek[i].slice(0,-2)+'.png')} alt={this.state.ostatniKlocek[i].slice(0,-2)}/>
            </li>
           )
           ostatniRuch.push(
             <li key={"kolumna"+(i+1)} className="Stan-tekst">
                w kolumnie {this.state.ostatniKlocek[i].slice(-2)}
              </li>
           )
        }
     }
    }
    var stanPlanszy=[] //pusty przy nowej grze
    if (this.props.location.state!==undefined) //gra jest wczytana
    {
      stanPlanszy=this.props.location.state.dane[1].stanPlanszy
    }

    return (
      <div className="Gra">
        <p className="Gracz">
            Obecnie ruch wykonuje gracz {this.state.player}
        </p>
        <GameGrid metodaPrzekladania={this.przelozSymbol} ref={this.plansza}  stan={stanPlanszy}></GameGrid>
        <p className="Gracz">
            Gracz 1
        </p>
        <PlayerGrid player={1} symbole={gracz1} ref={this.panelGracza1}></PlayerGrid>
        <p className="Gracz">
            Gracz 2
        </p>
        <PlayerGrid player={2} symbole={gracz2} ref={this.panelGracza2}></PlayerGrid>
        <p className="Gracz">
            Gracz 3
        </p>
        <PlayerGrid player={3} symbole={gracz3} ref={this.panelGracza3}></PlayerGrid>
        <p className="Gracz">
            Gracz 4
        </p>
        <PlayerGrid player={4} symbole={gracz4} ref={this.panelGracza4}></PlayerGrid>
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

export default withRouter(Gra);
