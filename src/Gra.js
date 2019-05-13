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
  constructor(props) {
    super(props);
    //nowa gra
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
      var ostatni1=["","",""],ostatni2=["","",""],ostatni3=["","",""],ostatni4=["","",""];
      this.state.ostatniKlocek.push (ostatni1,ostatni2,ostatni3,ostatni4)
    }
    //wczytywanie gry
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

    //funkcja zwraca 3 możliwe wartości: 0 - nie przekładać klocka, 1- przełożyć 1 klocek 2-przełożyć kolumne
    var wartośćZwrotna=gra.drugaZasada(stanKolumny)
    if (wartośćZwrotna!==2)
    {
      wartośćZwrotna=gra.pierwszaZasada(stanKolumny, wybranySymbol)
    }
   

    //dodawanie klocka do tabeli
    if (wartośćZwrotna===1)
    {
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
          aktualny[0][0]=klocek+kolumna
          aktualny[0][1]=""
          aktualny[0][2]=""
          gra.setState({ ostatniKlocek: aktualny }) 
          gracz1.push(klocek)
          break
        }
        case 2: 
        {
          aktualny[1][0]=klocek+kolumna
          aktualny[1][1]=""
          aktualny[1][2]=""
          gra.setState({ ostatniKlocek: aktualny }) 
          gracz2.push(klocek)
          break
        }
        case 3: 
        {
          aktualny[2][0]=klocek+kolumna
          aktualny[2][1]=""
          aktualny[2][2]=""
          gra.setState({ ostatniKlocek: aktualny }) 
          gracz3.push(klocek)
          break
        }
        case 4: 
        {
          aktualny[3][0]=klocek+kolumna
          aktualny[3][1]=""
          aktualny[3][2]=""
          gra.setState({ ostatniKlocek: aktualny }) 
          gracz4.push(klocek)
          break
        }
        default:
        {
          break
        }
      }
    }

    if (wartośćZwrotna===2)
    {
      aktualny=gra.state.ostatniKlocek;
      switch(gra.state.player)
      {
        case 1: 
        {
          if (stanKolumny.showRed)
          {
            aktualny[0][0]="r"+stanKolumny.redSymbol+kolumna
          }
          else
          {
            aktualny[0][0]=""
          }
          if (stanKolumny.showBlack)
          {
            aktualny[0][1]="b"+stanKolumny.blackSymbol+kolumna
          }
          else
          {
            aktualny[0][1]=""
          }
          if (stanKolumny.showGreen)
          {
            aktualny[0][2]="g"+stanKolumny.greenSymbol+kolumna
          }
          else
          {
            aktualny[0][2]=""
          }
          for (var i=0;i<3;i++)
          {
            if (aktualny[0][i]!=="")
            {
              if (kolumna<10)
              {
                gracz1.push(aktualny[0][i].slice(0,-1))
              }
              else
              {
                gracz1.push(aktualny[0][i].slice(0,-2))
              }
            }
          }
          gra.setState({ ostatniKlocek: aktualny }) 
          break
        }
        case 2: 
        {
          if (stanKolumny.showRed)
          {
            aktualny[1][0]="r"+stanKolumny.redSymbol+kolumna
          }
          else
          {
            aktualny[1][0]=""
          }
          if (stanKolumny.showBlack)
          {
            aktualny[1][1]="b"+stanKolumny.blackSymbol+kolumna
          }
          else
          {
            aktualny[1][1]=""
          }
          if (stanKolumny.showGreen)
          {
            aktualny[1][2]="g"+stanKolumny.greenSymbol+kolumna
          }
          for (i=0;i<3;i++)
          {
            if (aktualny[1][i]!=="")
            {
              if (kolumna<10)
              {
                gracz2.push(aktualny[1][i].slice(0,-1))
              }
              else
              {
                gracz2.push(aktualny[1][i].slice(0,-2))
              }
            }
          }
          gra.setState({ ostatniKlocek: aktualny }) 
          break
        }
        case 3: 
        {
          if (stanKolumny.showRed)
          {
            aktualny[2][0]="r"+stanKolumny.redSymbol+kolumna
          }
          else
          {
            aktualny[2][0]=""
          }
          if (stanKolumny.showBlack)
          {
            aktualny[2][1]="b"+stanKolumny.blackSymbol+kolumna
          }
          else
          {
            aktualny[2][1]=""
          }
          if (stanKolumny.showGreen)
          {
            aktualny[2][2]="g"+stanKolumny.greenSymbol+kolumna
          }
          for (i=0;i<3;i++)
          {
            if (aktualny[2][i]!=="")
            {
              if (kolumna<10)
              {
                gracz3.push(aktualny[2][i].slice(0,-1))
              }
              else
              {
                gracz3.push(aktualny[2][i].slice(0,-2))
              }
            }
          }
          gra.setState({ ostatniKlocek: aktualny }) 
          break
        }
        case 4: 
        {
          if (stanKolumny.showRed)
          {
            aktualny[3][0]="r"+stanKolumny.redSymbol+kolumna
          }
          else
          {
            aktualny[3][0]=""
          }
          if (stanKolumny.showBlack)
          {
            aktualny[3][1]="b"+stanKolumny.blackSymbol+kolumna
          }
          else
          {
            aktualny[3][1]=""
          }
          if (stanKolumny.showGreen)
          {
            aktualny[3][2]="g"+stanKolumny.greenSymbol+kolumna
          }
          for (i=0;i<3;i++)
          {
            if (aktualny[3][i]!=="")
            {
              if (kolumna<10)
              {
                gracz4.push(aktualny[3][i].slice(0,-1))
              }
              else
              {
                gracz4.push(aktualny[3][i].slice(0,-2))
              }
            }
          }
          gra.setState({ ostatniKlocek: aktualny }) 
          break
        }
        default:
        {
          break
        }
      }
    }

    //ustawienie w stanie czyja jest tura
    //przerobić potem żeby == było równe liczbie graczy
    if (wartośćZwrotna>0)
    {
      if (gra.state.player===4)
      {
        gra.setState({ player: 1 }) 
      }
      else
      {
        gra.setState({player: ++gra.state.player}) 
      }
    }
    return wartośćZwrotna
  }

  //pierwsza zasada: Możesz wziąć dokładnie jeden klocek, jeśli spełnia on dwa warunki:
  //1. ani Ty ani przeciwnik nie ma jeszcze klocka z takim symbolem,
  //2. klocek ten leży w kolumnie zawierającej 3 klocki. 
  //klocek leży w kolumnie zawierającej 3 klocki 
  pierwszaZasada(stanKolumny, wybranySymbol)
  {
    var wartoscZwrotna=0
    if (stanKolumny.showRed&&stanKolumny.showBlack&&stanKolumny.showGreen)
    {
      var temp=gra.panelGracza1.current.state.symbole
      for (var i=0; i<temp.length;i++)
      {
        if(temp[i].length>0)
        {
          if (temp[i][0].charAt(1)===wybranySymbol)
          {
            return wartoscZwrotna
          }
        }
      }
      temp=gra.panelGracza2.current.state.symbole
      for (i=0; i<temp.length;i++)
      {
        if(temp[i].length>0)
        {
          if (temp[i][0].charAt(1)===wybranySymbol)
          {
            return wartoscZwrotna
          }
        }
      }
      temp=gra.panelGracza3.current.state.symbole
      for (i=0; i<temp.length;i++)
      {
        if(temp[i].length>0)
        {
          if (temp[i][0].charAt(1)===wybranySymbol)
          {
            return wartoscZwrotna
          }
        }
      }
      temp=gra.panelGracza4.current.state.symbole
      for (i=0; i<temp.length;i++)
      {
        if(temp[i].length>0)
        {
          if (temp[i][0].charAt(1)===wybranySymbol)
          {
            return wartoscZwrotna
          }
        }
      }
      wartoscZwrotna=1
    }
    return wartoscZwrotna;
  }

  //druga zasada: Możesz wziąć całą kolumnę (a w kolumnie mogą leżeć 2 lub 3 klocki):
  //- jeśli masz już wszystkie symbole leżące w tej kolumnie
  //- lub jeśli dokładnie jeden klocek w tej kolumnie ma symbol, którego nie masz. 
  drugaZasada(stanKolumny)
  {
    var wartoscZwrotna=0
    var ileBrakuje=0
    switch(gra.state.player)
    {
      case 1: 
      {
        var temp=gra.panelGracza1.current.state.symbole
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
        czyZnaleziono=false
        for (i=0; i<temp.length;i++)
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
        czyZnaleziono=false
        for (i=0; i<temp.length;i++)
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
        wartoscZwrotna=2
      }
    }
    return wartoscZwrotna
  }

  zapiszGre()
  {
    var zapis={
      dane:[]
    }
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
      var czy2cyfrowaKolumna
      ostatniRuch.push(
      <li key={"Stan-tekst"+(i+1)} className="Stan-tekst">
        Ostatni ruch gracza {i+1}
      </li>)
      //mogą być max 3 klocki zabrane w turze
      for (var j=0;j<3;j++)
      {
        if (this.state.ostatniKlocek[i][j]!=="")
        {
        //czy numer kolumny jest 1 czy 2 cyfrowy
          if (this.state.ostatniKlocek[i][j].length===3)
          {
            czy2cyfrowaKolumna=false
            ostatniRuch.push(
            <li key={"symbol"+(i+1)+j}>
              <img src={require('./symbole/'+this.state.ostatniKlocek[i][j].slice(0,-1)+'.png')} alt={this.state.ostatniKlocek[i][j].slice(0,-1)}/>
            </li>
            )
          }
          else
          {
            czy2cyfrowaKolumna=true
            ostatniRuch.push(
              <li key={"symbol"+(i+1)+j}>
                <img src={require('./symbole/'+this.state.ostatniKlocek[i][j].slice(0,-2)+'.png')} alt={this.state.ostatniKlocek[i][j].slice(0,-2)}/>
              </li>
            )
          }
        }
      } 
      ostatniRuch.push(
      <li key={"kolumna"+(i+1)} className="Stan-tekst">
        w kolumnie {this.state.ostatniKlocek[i][0].slice(-1-czy2cyfrowaKolumna)}
      </li> )
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
