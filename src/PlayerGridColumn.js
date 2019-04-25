import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';


class PlayerGridColumn extends Component {

  render() {
  
  //ustalam ktore klocki beda pokazane za pomocą poszczególnych stanów dla każdego koloru w kolumnie
  return <GridListTile><Grid
    container
    direction="column"
    justify="space-between"
    alignItems="stretch"
  >
    {this.props.red ? <img src={require('./symbole/r'+this.props.znak+'.png')}  alt={this.props.znak}/> : null}
    {this.props.black ? <img src={require('./symbole/b'+this.props.znak+'.png')} alt={this.props.znak}/> : null}
    {this.props.green ? <img src={require('./symbole/g'+this.props.znak+'.png')} alt={this.props.znak}/> : null}
  </Grid></GridListTile>
  }
}

export default PlayerGridColumn;
