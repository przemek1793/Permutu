import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridColumn from "./GridColumn";

class GameGrid extends Component {

  //dac do stanu tabele referencji do kolumn i tak bede zapisywał
  render() {
    var children = [];
    var i;
    this.kolumny=[];
    for (i = 1; i < 27; i++) {
      this.kolumny[i]= React.createRef();
      var stanKolumny=undefined
      if (this.props.stan[i]!==undefined)
      {
        stanKolumny=this.props.stan[i]
      }
      children.push(<GridColumn key={i} metodaPrzekladania={this.props.metodaPrzekladania} wybierzGracza={this.props.wybierzGracza} numerKolumny={i} ref={this.kolumny[i]} stan={stanKolumny}></GridColumn>)
    } 
    return (
      <GridList
        direction="row"
        justify="space-between"
      >
        {children}
      </GridList>
    );
  }
}

export default GameGrid;
