import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import PlayerGridColumn from "./PlayerGridColumn";
import './PlayerGrid.css';

class PlayerGrid extends Component {


    constructor(props) {
        super(props);
        this.state={player: props.player, symbole: [],punkty:0}
        var A =[], B= [], C= [], D= [], E= [], F= [], G= [], H= [], I= [], J= [], K= [], L= [], M= [], N= [], O= [], P= [], Q= [], R= [], S= [], T= [], U= [], V= [], W= [], X= [], Y= [],Z= []
        this.state.symbole.push(A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z)
    }

    componentWillReceiveProps(props)
    {
      if (props.symbole.length>0)
      {
        for (var i=0; i<props.symbole.length; i++)
        {
          //kod ascii aktualnego symbolu
          var indeks=props.symbole[i].charCodeAt(1)-65
          if (!this.state.symbole[indeks].includes(props.symbole[i]))
          {
            var stan=this.state.symbole
            stan[indeks].push(props.symbole[i])
            this.setState({symbole: stan})
          }
        }
      }
      this.liczPunkty()
    }

    liczPunkty()
    {
      var tempPunkty=0;
      for (var i=0;i<this.state.symbole.length;i++)
      {
        switch(this.state.symbole[i].length)
        {
          case 2:
          {
            tempPunkty++
            break;
          }
          case 3:
          {
            tempPunkty=tempPunkty+3
            break;
          }
          default:
          {
            break;
          }
        }
      }
      this.setState({punkty: tempPunkty})
    }


  render() {

    var klocki=[]

    for (var i=0;i<this.state.symbole.length;i++)
    {
      klocki.push(
        <PlayerGridColumn znak={String.fromCharCode(i+65)} 
          red={this.state.symbole[i].includes('r'+String.fromCharCode(i+65))} 
          black={this.state.symbole[i].includes('b'+String.fromCharCode(i+65))} 
          green={this.state.symbole[i].includes('g'+String.fromCharCode(i+65))}>
        </PlayerGridColumn>)
    }

    return (
      <div className="div">
        <GridList
        direction="row"
        justify="space-between"
      >
        {klocki}
      </GridList>
      <p className="punkty">Obecne punkty: {this.state.punkty}</p>
      </div>
    );
    //zrobie ramke z punktami i czyja jest teraz tura
  }
}

export default PlayerGrid;
