import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import './Avatar.css'

export default class Avatars extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidUpdate(){
    console.log("hello")
  }
  render(){
    return (
      <Grid container justify="center" alignItems="center">
        <Avatar className="purpleAvatar">{this.props.name[0]}</Avatar>
      </Grid>
      );
  } 
}
