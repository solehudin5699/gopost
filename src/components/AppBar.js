import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from "../assets/logo.png"


const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft:'10px',
    [theme.breakpoints.down('sm')]: {
      display:'none'
    }
  },
  subTitle:{
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
      textAlign:'right'
    }
  },
  containerLogo:{
    height:'35px', 
    width:'auto',
    overflow:'hidden', 
    border:'1px solid #FFFFFF', 
    borderRadius:'5px', 
    padding:'10px', 
    backgroundColor:'#FFFFFF',
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
      <AppBar position="sticky" style={{paddingLeft:'2vw',paddingRight:'2vw'}}>
        <Toolbar>
          <div className={classes.containerLogo}>
            <img style={{height:'25px'}} src={logo} />
          </div>
          <Typography variant="h6" className={classes.title}>
            VirtualSpirit
          </Typography>
          <Typography variant="h6" className={classes.subTitle}>
            GoPost App
          </Typography>
        </Toolbar>
      </AppBar>
  );
}
