import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "./AppBar"
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection:'column'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function PageBase(props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar/>
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  );
}

