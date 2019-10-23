import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import styles from './Seeall.module.css'

const useStyles = makeStyles(theme => ({
  container:{
    height:"100%",
    backgroundImage:"linear-gradient(#000, #000)",
    padding:"100px 0",
    textAlign:"center"
  },
  card: {
    maxWidth: 280,
    width:250,
    borderRadius:15,
    backgroundImage:"linear-gradient(rgba(0,0,0,0),rgba(0, 0, 0,0.4) 99%),url(https://firebasestorage.googleapis.com/v0/b/fir-bbaa1.appspot.com/o/images%2F1.jpeg?alt=media&token=0287cc0c-8a6c-429e-ac29-b5027e12827a)",
    backgroundSize:"cover",
    backgroundPosition:"center",
    height:450,
    marginTop:20,
    marginRight:20,
    display:"inline-block",
    color:"white"
  },
  user: {
    padding:0,
    width:40,
  },
  avatar: {
    margin: 5,
    width: 50,
    height: 50,
  },
  hashTag:{
    height: 30,
    paddingTop: '100.25%', // 16:9
    paddingBottom:0,
    paddingLeft:0,
    fontFamily: 'Pacifico',
    margin:0,
    color:"white"
  },
  title:{
      fontFamily:'Fira Sans, sans-serif',
      fontSize:30
  },
  icon:{
    textAlign:"right",
    marginRight:20,
    marginBottom:40
  }
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent className={classes.hashTag}>
          <Typography variant="body" component="p">
            # BeingProfessional
          </Typography>
        </CardContent>
        <CardContent className={classes.title} >
          <Typography variant="body" component="p">
            First day being    
          </Typography>
        </CardContent>
        <CardHeader className={classes.user}
          avatar={
              <Avatar alt="Remy Sharp" src="https://firebasestorage.googleapis.com/v0/b/fir-bbaa1.appspot.com/o/images%2F2.jpeg?alt=media&token=0d6ef322-a75c-43ac-867d-1703e8ad2302" className={classes.avatar} />
          }
          title="Nrupul"
        />
        <div className={classes.icon}>
          <Badge className={classes.margin} badgeContent={4} color="primary">
            <Icon className="far fa-smile-beam" color="primary" />
          </Badge>
          <Badge className={classes.margin} badgeContent={4} color="primary">
            <Icon style={{marginLeft:"15px",width:"30px"}} className="far fa-comment-alt" color="primary" />
          </Badge>        
        </div>
      </Card>                                                                                
    </div>
  );
}