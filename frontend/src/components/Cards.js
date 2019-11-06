import React,{useState,useEffect} from 'react';
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
// import ShareIcon from '@material-ui/icons/Share';
import styles from './Cards.module.css'
import { textAlign } from '@material-ui/system';
import {Redirect} from 'react-router-dom'
import { Link } from "react-router-dom";
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  container:{
    height:"100%",
    backgroundImage:"linear-gradient(#000, #000)",
    padding:"100px 0",
    textAlign:"center"
  },
  card: {
    maxWidth: 280,
    width:350,
    borderRadius:15,
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
    paddingTop: '80.25%', // 16:9
    paddingBottom:0,
    paddingLeft:0,
    fontFamily: 'Pacifico',
    margin:0,
    color:"white"
  },
  title:{
      fontFamily:'Fira Sans, sans-serif',
      fontSize:30,
      textAlign:"center",
      marginBottom:"25px"
  },
  icon:{
    textAlign:"right",
    marginRight:20,
    marginBottom:40
  }
}));


export default function Cards(props) {
  const [friends, setFriends] = useState("");
  const [happy, setHappy]=useState(false)
  useEffect((prevProps,prevState) => {
    if(friends===""||happy){
      console.log("haren")
    axios({method:"get",url:"http://127.0.0.1:5000/user-recent"})
    .then(res=>{
      console.log(res.data.status)
      setFriends(res.data.status)
      setHappy(false)
    })

    .catch(err=>alert(err))}
  });
  function handleHappy(e){
    let username= e.target.id
    console.log(e.target.id)
    console.log(username,"username")
    let currentuser=localStorage.getItem("token")
    axios({method:"get",url:`http://127.0.0.1:5000/user-like/${currentuser}/${username}`})
    .then(res=>{
      console.log(res.data.res)
      // setHappy(true)
    })
    .catch(err=>alert(err))
  }
  console.log("hi")
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {friends!==""?<React.Fragment>
      {
        friends.map((ele)=>{
          return(
            <Card className={classes.card} style={{backgroundImage:`linear-gradient(rgba(0,0,0,0),rgba(0, 0, 0,0.4) 99%),url(${ele.media_link})`}} key={ele._id.$oid}>
            <CardContent className={classes.hashTag}>
            <Typography variant="body" component="p">
              {ele.hash_tag}
            </Typography>
          </CardContent>
          <CardContent className={classes.title} >
            <Typography variant="body" component="p">
              {ele.title}   
            </Typography>
          </CardContent>
       <Link to="/loginsignup"><CardHeader className={classes.user}
            avatar={
              <Avatar className={classes.avatar}>{ele.posted_by[0]}</Avatar>
            }
            title={ele.posted_by}
          /></Link>
          {/* <div className={classes.icon}> */}
            <Badge id={ele._id.$oid} onClick={handleHappy} className={classes.margin} badgeContent={ele.happy.length} color="primary">
            {/* <Link to="/loginsignup"> <Icon className="fa fa-smile" /></Link> */}
            {localStorage.getItem("token")==null?<Redirect to="/loginsignup"/>:<p id={ele._id.$oid}>happy</p> }
            </Badge>&nbsp; &nbsp;&nbsp;
            <Badge id={ele.posted_by} className={classes.margin} badgeContent={ele.comments.length} color="primary">
            {localStorage.getItem("token")==null?<Redirect to="/loginsignup"/>:<Icon style={{marginLeft:"15px",width:"30px"}} className="fa fa-comments"/>}
            </Badge>        
          {/* </div> */}
          </Card>
          )
        })
        }
      </React.Fragment>:null}                                                                                
    </div>
  );
}
 