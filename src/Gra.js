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
      gracz1NieMaRuchów: false,
      gracz2NieMaRuchów: false,
      gracz3NieMaRuchów: false,
      gracz4NieMaRuchów: false
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

  //funkcja wywoływana po kliknięciu na klocek
  przelozSymbol(wybranyKolor, kolumna, stanKolumny){
    //funkcja zwraca 3 możliwe wartości: 0 - nie przekładać klocka, 1- przełożyć 1 klocek 2-przełożyć kolumne
    //na podstawie zwróconej wartości kolumna z klikniętym klockiem jest aktualizowana

    //sprawdzenie czy wybrany klocek nie jest już wzięty
    var czyWziety=false
    switch(wybranyKolor)
    {
      case 'r': 
      {
        czyWziety=!stanKolumny.showRed
        break
      }
      case 'b': 
      {
        czyWziety=!stanKolumny.showBlack 
        break
      }
      case 'g': 
      {
        czyWziety=!stanKolumny.showGreen
        break
      }
      default:
      {
        break
      }
    }

    if (czyWziety)
    {
      return 0
    }

    var wartośćZwrotna=gra.drugaZasada(stanKolumny)
    if (wartośćZwrotna!==2)
    {
      wartośćZwrotna=gra.pierwszaZasada(stanKolumny, wybranyKolor)
    }

    gra.aktualizujKlockiGraczy(wartośćZwrotna, stanKolumny, kolumna, wybranyKolor)
    gra.aktualizujTure(wartośćZwrotna,4)
    return wartośćZwrotna
  }

  //pierwsza zasada: Możesz wziąć dokładnie jeden klocek, jeśli spełnia on dwa warunki:
  //1. ani Ty ani przeciwnik nie ma jeszcze klocka z takim symbolem,
  //2. klocek ten leży w kolumnie zawierającej 3 klocki. 
  //klocek leży w kolumnie zawierającej 3 klocki 
  pierwszaZasada(stanKolumny, wybranyKolor)
  {
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
  drugaZasada(stanKolumny, gracz=gra.wybierzStanGracza())
  {
    var wartoscZwrotna=0
    var ileBrakuje=0
    var temp=gracz.symbole
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

  aktualizujKlockiGraczy(czyPrzelozyc, stanKolumny, kolumna, wybranyKolor)
  {
    var index=gra.state.player-1
    var aktualny=gra.state.ostatniKlocek;
    if (czyPrzelozyc===1)
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
      aktualny[index][0]=klocek+kolumna
      aktualny[index][1]=""
      aktualny[index][2]=""
      switch(gra.state.player)
      {
        case 1: 
        {
          gracz1.push(klocek)
          break
        }
        case 2: 
        {
          gracz2.push(klocek)
          break
        }
        case 3: 
        {
          gracz3.push(klocek)
          break
        }
        case 4: 
        {
          gracz4.push(klocek)
          break
        }
        default:
        {
          break
        }
      }
    }

    if (czyPrzelozyc===2)
    {
      if (stanKolumny.showRed)
      {
        aktualny[index][0]="r"+stanKolumny.redSymbol+kolumna
      }
      else
      {
        aktualny[index][0]=""
      }
      if (stanKolumny.showBlack)
      {
        aktualny[index][1]="b"+stanKolumny.blackSymbol+kolumna
      }
      else
      {
        aktualny[index][1]=""
      }
      if (stanKolumny.showGreen)
      {
        aktualny[index][2]="g"+stanKolumny.greenSymbol+kolumna
      }
      else
      {
        aktualny[index][2]=""
      }
      for (var i=0;i<3;i++)
      {
        if (aktualny[index][i]!=="")
        {
          var offset
          if (kolumna<10)
          {
            offset=1
          }
          else
          {
            offset=2
          }
          switch(gra.state.player)
          {
            case 1:
            {
              gracz1.push(aktualny[index][i].slice(0,-offset))
              break;
            }
            case 2:
            {
              gracz2.push(aktualny[index][i].slice(0,-offset))
              break;
            }
            case 3:
            {
              gracz3.push(aktualny[index][i].slice(0,-offset))
              break;
            }
            case 4:
            {
              gracz4.push(aktualny[index][i].slice(0,-offset))
              break;
            }
            default:
            {
              break;
            }
          }
        }
      }
    }
    gra.setState({ ostatniKlocek: aktualny }) 
  }

  aktualizujTure(czyPrzelozono, iluGraczy)
  {
    if (czyPrzelozono>0)
    {
      if (gra.state.player===iluGraczy)
      {
        gra.setState({ player: 1 }) 
      }
      else
      {
        gra.setState({player: ++gra.state.player}) 
      }
    }
    //if (gra.state.player!==1)
    //wywołaj metode tego innego playera
    //metody to strategie i będą trzymane w stanie gry
    //np gracz2: biereZawszezLewej
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

  wybierzStanGracza()
  {
    var panel
    switch(gra.state.player)
    {
      case 1: 
      {
        panel=gra.panelGracza1.current.state
        break
      }
      case 2: 
      {
        panel=gra.panelGracza2.current.state
        break
      }
      case 3: 
      {
        panel=gra.panelGracza3.current.state
        break
      }
      case 4: 
      {
        panel=gra.panelGracza4.current.state
        break
      }
      default:
      {
        break
      }
    }
    return panel
  }

  zdejmijKlocekZPlanszy(kolumna, kolor)
  {
    switch(kolor)
    {
      case 'r':
      {
        kolumna.setState({showRed: false})
        break;
      }
      case 'b':
      {
        kolumna.setState({showBlack: false})
        break;
      }
      case 'g':
      {
        kolumna.setState({showGreen: false})
        break;
      }
      default:
      {
        break;
      }
    }
  }

  zdejmijKolumneZPlanszy(kolumna)
  {
    gra.zdejmijKlocekZPlanszy(kolumna,'r')
    gra.zdejmijKlocekZPlanszy(kolumna,'b')
    gra.zdejmijKlocekZPlanszy(kolumna,'g')
  }

  wybierzGracza()
  {
    switch(gra.state.player)
    {
      case 1:
      {
        if (gra.czySaRuchy())
        {
          if (gra.state.gracz1NieMaRuchów)
          {
            gra.setState({ gracz1NieMaRuchów: false})
          }
        }
        else
        {
          if (!gra.state.gracz1NieMaRuchów)
          {
            gra.setState({ gracz1NieMaRuchów: true})
          }
        }
        break;
      }
      case 2:
      {
        if (gra.czySaRuchy())
        {
          gra.strategia2KlockiZZachowaniemNaKoniec()
          if (gra.state.gracz2NieMaRuchów)
          {
            gra.setState({ gracz2NieMaRuchów: false})
          }
        }
        else
        {
          gra.aktualizujTure(5, 4)
          if (!gra.state.gracz2NieMaRuchów)
          {
            gra.setState({ gracz2NieMaRuchów: true})
          }
        }
        break;
      }
      case 3:
      {
        if (gra.czySaRuchy())
        {
          gra.strategia1WolnaKolumna()
          if (gra.state.gracz3NieMaRuchów)
          {
            gra.setState({ gracz3NieMaRuchów: false})
          }
        }
        else
        {
          gra.aktualizujTure(5, 4)
          if (!gra.state.gracz3NieMaRuchów)
          {
            gra.setState({ gracz3NieMaRuchów: true})
          }
        }
        break;
      }
      case 4:
      {
        if (gra.czySaRuchy())
        {
          gra.strategia1WolnaKolumna3Elementowa()
          if (gra.state.gracz4NieMaRuchów)
          {
            gra.setState({ gracz4NieMaRuchów: false})
          }
        }
        else
        {
          gra.aktualizujTure(5, 4)
          if (!gra.state.gracz4NieMaRuchów)
          {
            gra.setState({ gracz4NieMaRuchów: true})
          }
        }
        break;
      }
      default:
      {
        break;
      }
    }
  }

  //Funkcja sprawdzająca czy gracz ma dostępne ruchy
  czySaRuchy()
  {
    for (var i=1;i<27;i++)
    {
      var zwrotZasad=0
      zwrotZasad=gra.pierwszaZasada(gra.plansza.current.kolumny[i].current.state, 'r')
      if (zwrotZasad===0)
      {
        zwrotZasad=gra.pierwszaZasada(gra.plansza.current.kolumny[i].current.state, 'b')
      }
      if (zwrotZasad===0)
      {
        zwrotZasad=gra.pierwszaZasada(gra.plansza.current.kolumny[i].current.state, 'g')
      }
      if (zwrotZasad===0)
      {
        zwrotZasad=gra.drugaZasada(gra.plansza.current.kolumny[i].current.state)
      }
      if (zwrotZasad>0)
      {
        if (gra.state.player===1)
        {
          console.log("Jest ruch w kolumnie "+i)
        } 
        return true
      } 
    }
    return false
  }

  //funckja dostępna po kliknięciu przycisku dostępnego w przypadku braku ruchów
  pominRuch()
  {
    if (gra.state.player===1)
    {
      gra.setState({player: ++gra.state.player}) 
    }
  }

  //funkcja sprawdzająca czy aktualny gracz jako jedyny może wziąć daną kolumnę
  //jeśli reguła 2 jest spełniona to reguła 1 nie może być spełniona, a więc wystarczy sprawdzić regułe 2 dla wszystkich graczy
  sprawdzCzyTwojaKolumna(stanKolumny)
  {
    if (gra.drugaZasada(stanKolumny)===2)
    {
      var temp=0
      if (gra.drugaZasada(stanKolumny, gra.panelGracza1.current.state)===2)
      {
        temp++
      }
      if (gra.drugaZasada(stanKolumny, gra.panelGracza2.current.state)===2)
      {
        temp++
      }
      if (gra.drugaZasada(stanKolumny, gra.panelGracza3.current.state)===2)
      {
        temp++
      }
      if (gra.drugaZasada(stanKolumny, gra.panelGracza4.current.state)===2)
      {
        temp++
      }
      //tylko jeden gracz(aktualny) może wziąć kolumnę
      if (temp===1)
      {
        return true
      }
      else
      {
        return false
      }
    }
    else
    {
      //gracz nie może wziąć kolumny
      return false
    }
  }

  componentDidUpdate()  {
    gra.wybierzGracza()
  }

  //Strategie
  //1. Weź pierwszy dostępny klocek od lewej
  strategia1Wolny()
  {
    var wartoscZwrotna=0
    var kolor
    //sprawdź wszystkie kolumy
    for (var i=1;i<27;i++)
    {
      wartoscZwrotna=gra.przelozSymbol('r', i, gra.plansza.current.kolumny[i].current.state,gra.plansza.current.kolumny[i].current)
      kolor='r'
      if (wartoscZwrotna===0)
      {
        wartoscZwrotna=gra.przelozSymbol('b', i, gra.plansza.current.kolumny[i].current.state,gra.plansza.current.kolumny[i].current)
        kolor='b'
      }
      if (wartoscZwrotna===0)
      {
        wartoscZwrotna=gra.przelozSymbol('g', i, gra.plansza.current.kolumny[i].current.state,gra.plansza.current.kolumny[i].current)
        kolor='g'
      }
      if (wartoscZwrotna!==0)
      {
        if (wartoscZwrotna===1)
        {
          gra.zdejmijKlocekZPlanszy(gra.plansza.current.kolumny[i].current,kolor)
        }
        if (wartoscZwrotna===2)
        {
          gra.zdejmijKolumneZPlanszy(gra.plansza.current.kolumny[i].current)
        }
        return
      }
    }
  }

  //2. Weź pierwszą dostępną kolumnę od lewej, a jeśli nie ma takiej to weź pierwszy wolny klocek od lewej
  strategia1WolnaKolumna()
  {
    var wartoscZwrotna=0
    var kolor
    //szukaj kolumny do zdjęcia
    for (var i=1;i<27;i++)
    {
      wartoscZwrotna=gra.drugaZasada(gra.plansza.current.kolumny[i].current.state)
      if (wartoscZwrotna===2)
      {
        if(gra.plansza.current.kolumny[i].current.state.showRed)
        {
          kolor='r'
        }
        else
        {
          kolor='b'
        }
        gra.przelozSymbol(kolor, i, gra.plansza.current.kolumny[i].current.state)
        gra.zdejmijKolumneZPlanszy(gra.plansza.current.kolumny[i].current)
        return
      }
    }
    //nie ma kolumny do zdjęcia, szukaj klocka do zdjęcia
    for (i=1;i<27;i++)
    {
      wartoscZwrotna=gra.przelozSymbol('r', i, gra.plansza.current.kolumny[i].current.state)
      kolor='r'
      if (wartoscZwrotna===0)
      {
        wartoscZwrotna=gra.przelozSymbol('b', i, gra.plansza.current.kolumny[i].current.state)
        kolor='b'
      }
      if (wartoscZwrotna===0)
      {
        wartoscZwrotna=gra.przelozSymbol('g', i, gra.plansza.current.kolumny[i].current.state)
        kolor='g'
      }
      if (wartoscZwrotna!==0)
      {
        gra.zdejmijKlocekZPlanszy(gra.plansza.current.kolumny[i].current,kolor)
        return
      }
    }
  }

  //3.Weź pierwszą dostępną kolumnę od lewej, która zawiera 3 klocki, jeśli nie ma takiej to weź pierwszą dostępną kolumnę od lewej, jeśli takiej też nie ma
  //to weź pierwszy wolny klocek od lewej 
  strategia1WolnaKolumna3Elementowa(kolumnyDoOpuszczenia=0)
  {
    var wartoscZwrotna=0
    var kolor
    //szukaj kolumny 3 elementowej do zdjęcia
    for (var i=1;i<27;i++)
    {
      if (kolumnyDoOpuszczenia===0||!kolumnyDoOpuszczenia.includes(i))
      {
        wartoscZwrotna=gra.drugaZasada(gra.plansza.current.kolumny[i].current.state)
        if (wartoscZwrotna===2&&gra.plansza.current.kolumny[i].current.state.showBlack&&gra.plansza.current.kolumny[i].current.state.showGreen&&gra.plansza.current.kolumny[i].current.state.showRed)
        {
          gra.przelozSymbol('r', i, gra.plansza.current.kolumny[i].current.state)
          gra.zdejmijKolumneZPlanszy(gra.plansza.current.kolumny[i].current)
          return
        }
      }
    }
    //szukaj kolumny do zdjęcia
    for (i=1;i<27;i++)
    {
      if (kolumnyDoOpuszczenia===0||!kolumnyDoOpuszczenia.includes(i))
      {
        wartoscZwrotna=gra.drugaZasada(gra.plansza.current.kolumny[i].current.state)
        if (wartoscZwrotna===2)
        {
          if(gra.plansza.current.kolumny[i].current.state.showRed)
          {
            kolor='r'
          }
          else
          {
            kolor='b'
          }
          gra.przelozSymbol(kolor, i, gra.plansza.current.kolumny[i].current.state)
          gra.zdejmijKolumneZPlanszy(gra.plansza.current.kolumny[i].current)
          return
        }
      }
    }
    //nie ma kolumny do zdjęcia, szukaj klocka do zdjęcia
    for (i=1;i<27;i++)
    {
      if (kolumnyDoOpuszczenia===0||!kolumnyDoOpuszczenia.includes(i))
      {
        wartoscZwrotna=gra.przelozSymbol('r', i, gra.plansza.current.kolumny[i].current.state)
        kolor='r'
        if (wartoscZwrotna===0)
        {
          wartoscZwrotna=gra.przelozSymbol('b', i, gra.plansza.current.kolumny[i].current.state)
          kolor='b'
        }
        if (wartoscZwrotna===0)
        {
          wartoscZwrotna=gra.przelozSymbol('g', i, gra.plansza.current.kolumny[i].current.state)
          kolor='g'
        }
        if (wartoscZwrotna!==0)
        {
          gra.zdejmijKlocekZPlanszy(gra.plansza.current.kolumny[i].current,kolor)
          return
        }
      }
    }
  }

  //4.Szukaj kolumny z 2 takimi samymi klockami, jeśli jest taka to zdobądź potrzebny klocek, a jeśli nie ma to zachowuj się zgodnie ze strategią 3
  //tabela zachowanych na później będzie w stanie
  strategia2Klocki()
  {
    for (var i=1;i<27;i++)
    {
      var takieSame=0
      var symbol
      var wartoscZwrotna
      if (gra.plansza.current.kolumny[i].current.state.redSymbol===gra.plansza.current.kolumny[i].current.state.blackSymbol)
      {
        takieSame++
        symbol=gra.plansza.current.kolumny[i].current.state.redSymbol
      }
      if (gra.plansza.current.kolumny[i].current.state.redSymbol===gra.plansza.current.kolumny[i].current.state.greenSymbol)
      {
        takieSame++
        symbol=gra.plansza.current.kolumny[i].current.state.redSymbol
      }
      if (gra.plansza.current.kolumny[i].current.state.blackSymbol===gra.plansza.current.kolumny[i].current.state.greenSymbol)
      {
        takieSame++
        symbol=gra.plansza.current.kolumny[i].current.state.blackSymbol
      }
      if (takieSame===1)
      {
        //szukaj ostatniego symbolu
        for (var j=1;j<27;j++)
        {
          //szukaj symbolu w innych kolumnach niż kolumna z 2 elementami
          if (j!==i)
          {
            var znaleziono=false
            var kolor
            if (gra.plansza.current.kolumny[j].current.state.blackSymbol===symbol)
            {
              znaleziono=true
              kolor='b'
            }
            if (gra.plansza.current.kolumny[j].current.state.redSymbol===symbol)
            {
              znaleziono=true
              kolor='r'
            }
            if (gra.plansza.current.kolumny[j].current.state.greenSymbol===symbol)
            {
              znaleziono=true
              kolor='g'
            }
            if (znaleziono)
            {
              wartoscZwrotna=gra.przelozSymbol(kolor, j, gra.plansza.current.kolumny[j].current.state)
              //zabiera brakujący symbol
              if (wartoscZwrotna>0)
              {
                gra.zdejmijKlocekZPlanszy(gra.plansza.current.kolumny[j].current,kolor)
                return
              }
              //
              //nie da się zdjąć tego symbolu więc szuka dalej
              else
              {
                break;
              }
            }
          }
        }
      }
    }
    //nie ma kolumny z w takimi samymi symbolami
    gra.strategia1WolnaKolumna3Elementowa()
    return
  }

  //5.To samo co straregia 4, ale zachowaj na koniec kolumny z 2 takimi samymi klockami
  //dorobić state, który będzie trzymał odrzucone kolumny
  //lepsza będzie metoda która sprawdza czy jesteś jedynym, który może zdjąć klocek
  strategia2KlockiZZachowaniemNaKoniec()
  {
    for (var i=1;i<27;i++)
    {
      if (!gra.sprawdzCzyTwojaKolumna(gra.plansza.current.kolumny[i].current.state))
      {
        var takieSame=0
        var symbol
        var wartoscZwrotna
        if (gra.plansza.current.kolumny[i].current.state.redSymbol===gra.plansza.current.kolumny[i].current.state.blackSymbol)
        {
          takieSame++
          symbol=gra.plansza.current.kolumny[i].current.state.redSymbol
        }
        if (gra.plansza.current.kolumny[i].current.state.redSymbol===gra.plansza.current.kolumny[i].current.state.greenSymbol)
        {
          takieSame++
          symbol=gra.plansza.current.kolumny[i].current.state.redSymbol
        }
        if (gra.plansza.current.kolumny[i].current.state.blackSymbol===gra.plansza.current.kolumny[i].current.state.greenSymbol)
        {
          takieSame++
          symbol=gra.plansza.current.kolumny[i].current.state.blackSymbol
        }
        if (takieSame===1)
        {
          //szukaj ostatniego symbolu
          for (var j=1;j<27;j++)
          {
            //szukaj symbolu w innych kolumnach niż kolumna z 2 elementami
            if (j!==i)
            {
              var znaleziono=false
              var kolor
              if (gra.plansza.current.kolumny[j].current.state.blackSymbol===symbol)
              {
                znaleziono=true
                kolor='b'
              }
              if (gra.plansza.current.kolumny[j].current.state.redSymbol===symbol)
              {
                znaleziono=true
                kolor='r'
              }
              if (gra.plansza.current.kolumny[j].current.state.greenSymbol===symbol)
              {
                znaleziono=true
                kolor='g'
              }
              if (znaleziono)
              {
                wartoscZwrotna=gra.przelozSymbol(kolor, j, gra.plansza.current.kolumny[j].current.state)
                //zabiera brakujący symbol
                if (wartoscZwrotna>0)
                {
                  gra.zdejmijKlocekZPlanszy(gra.plansza.current.kolumny[j].current,kolor)
                  return
                }
                //
                //nie da się zdjąć tego symbolu więc szuka dalej
                else
                {
                  break;
                }
              }
            }
          }
        }
      }
    }
    //nie ma kolumny z w takimi samymi symbolami, albo są już niedostępne dla innych graczy
    gra.strategia1WolnaKolumna3Elementowa()
    return
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
    var kolumna=0
    for (var i=0;i<4;i++)
    {
      var offset
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
            offset=1
          }
          else
          {
            offset=2
          }
          kolumna=this.state.ostatniKlocek[i][j].slice(-offset)
          ostatniRuch.push(
            <li key={"symbol"+(i+1)+j}>
              <img src={require('./symbole/'+this.state.ostatniKlocek[i][j].slice(0,-offset)+'.png')} alt={this.state.ostatniKlocek[i][j].slice(0,-offset)}/>
            </li>
            )
        }
      } 
      ostatniRuch.push(
      <li key={"kolumna"+(i+1)} className="Stan-tekst">
        w kolumnie {kolumna}
      </li> )
    }
    var stanPlanszy=[] //pusty przy nowej grze
    if (this.props.location.state!==undefined) //gra jest wczytana
    {
      stanPlanszy=this.props.location.state.dane[1].stanPlanszy
    }
    var brakRuchow=undefined
    if (this.state.gracz1NieMaRuchów&&this.state.gracz2NieMaRuchów&&this.state.gracz3NieMaRuchów&&this.state.gracz4NieMaRuchów)
    {
      brakRuchow=<p className="Gracz">
        Żaden z graczy nie ma dostępnych ruchów
        </p>
    }
    else if (this.state.gracz1NieMaRuchów)
    {
      brakRuchow=<div>
        <p className="Gracz">
        Nie masz żadnych dostępnych ruchów
        </p>
        <Button color="light" size="lg" style={{textDecoration: 'none', color:'black' }}  onClick={() => {this.pominRuch()}}>Pomiń ruch</Button>
      </div>
    }

    return (
      <div className="Gra">
        <p className="Gracz">
            Obecnie ruch wykonuje gracz {this.state.player}
        </p>
        {brakRuchow}
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
