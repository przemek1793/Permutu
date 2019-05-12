import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import './GridColumn.css';



var  red = ["A", "B", "C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var  black = ["A", "B", "C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var  green = ["A", "B", "C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


class GridColumn extends Component {

    constructor(props) {
        super(props);
        //nowa gra
        if(props.stan===undefined)
        {
          //jesli tablice są puste to zapełnij je
          if (red.length===0)
          {
              red = ["A", "B", "C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
          }
          if (black.length===0)
          {
            black = ["A", "B", "C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
          }
          if (green.length===0)
          {
              green = ["A", "B", "C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
          }

          let r,b,g;
            r= Math.floor(Math.random() * red.length);
            b= Math.floor(Math.random() * black.length);
            g= Math.floor(Math.random() * green.length);
            // stan zawiera informacje jakie klocki znajduja sie w kolumnie i czy mają być pokazywane
            this.state = { showRed: true, showBlack: true, showGreen: true, redSymbol: red[r], blackSymbol: black[b], greenSymbol: green[g]};
          //usuwanie uzytych elementow z tablicy
          red.splice(r,1);
          black.splice(b,1);
          green.splice(g,1);
        }
        //wczytywanie gry
        else
        {
          this.state = { 
            redSymbol: props.stan[0].red, 
            showRed: props.stan[1].showRed,
            blackSymbol: props.stan[2].black, 
            showBlack: props.stan[3].showBlack,
            greenSymbol: props.stan[4].green, 
            showGreen: props.stan[5].showGreen
          };
        }
        
      }

        //metoda przekładania będzie zwracała informacje co przełożyć:1)nic 2)1klocek 3)kolumne
          zabierzRed = () => {
            var zwrot=this.props.metodaPrzekladania('r', this.props.numerKolumny, this.state)
            if (zwrot===1)
            {
              this.setState({showRed: false})
            }
            if (zwrot===2)
            {
              this.setState({showRed: false,showBlack: false,showGreen: false})
            }
          }

          zabierzBlack = () => {
            var zwrot=this.props.metodaPrzekladania('b', this.props.numerKolumny, this.state)
            if (zwrot===1)
            {
              this.setState({showBlack: false})
            }
            if (zwrot===2)
            {
              this.setState({showRed: false,showBlack: false,showGreen: false})
            }    
           }

         zabierzGreen= () => {
            var zwrot=this.props.metodaPrzekladania('g', this.props.numerKolumny, this.state)
            if (zwrot===1)
            {
              this.setState({showGreen: false})
            }
            if (zwrot===2)
            {
              this.setState({showRed: false,showBlack: false,showGreen: false})
            }
          }

  render() {
  
  //ustalam ktore klocki beda pokazane za pomocą poszczególnych stanów dla każdego koloru w kolumnie
  return <GridListTile><Grid
    container
    direction="column"
    justify="space-between"
    alignItems="stretch"
  >
    <p className="numerKolumny" >{this.props.numerKolumny}</p>
    {this.state.showRed ? <img src={require('./symbole/r'+this.state.redSymbol+'.png')} onClick={this.zabierzRed.bind(this)} alt={this.state.redSymbol}/> : null}
    {this.state.showBlack ? <img src={require('./symbole/b'+this.state.blackSymbol+'.png')} onClick={this.zabierzBlack.bind(this)}  alt={this.state.blackSymbol}/> : null}
    {this.state.showGreen ? <img src={require('./symbole/g'+this.state.greenSymbol+'.png')} onClick={this.zabierzGreen.bind(this)}  alt={this.state.greenSymbol}/> : null}
  </Grid></GridListTile>
  }
}

export default GridColumn;
