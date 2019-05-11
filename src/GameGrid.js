import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridColumn from "./GridColumn";

class GameGrid extends Component {
  //dac do stanu tabele referencji do kolumn i tak bede zapisywał
  render() {

    var children = []; //będzie zawierał kolumny które będą dziećmi grida
    var i;
    this.kolumny=[];
    for (i = 1; i < 27; i++) {
      this.kolumny[i]= React.createRef();
      children.push(<GridColumn key={i} metodaPrzekladania={this.props.metodaPrzekladania} numerKolumny={i} ref={this.kolumny[i]}></GridColumn>)
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
