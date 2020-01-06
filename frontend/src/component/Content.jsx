import React from 'react';
import { Route, Switch} from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { uiSetting } from '../config/theme.config';
import Home from '../page/Home';
import Youtube from '../page/Youtube';
import Subscribe from '../page/Subscribe';
import Facebook from '../page/Facebook';
import Group from '../page/Group';
import About from '../page/About';

const drawerWidth = Number(uiSetting.drawerWidth);
const useStyles = makeStyles(theme => ({
  root: {
    //paddingTop: 50, //remove cuz Toolbar display "none"
    [theme.breakpoints.up('sm')]: {
      paddingLeft: drawerWidth + 2,
      with: '100%',
      margin: 'auto'
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: drawerWidth + 2,
      //paddingTop: 60,
      with: `calc(100% - ${drawerWidth}px)`
    },
  },
  paper: {
    padding: 10,
    minHeight: "91vh"
  }
}));

function Content() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={1} square className={classes.paper}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/youtube">
            <Youtube />
          </Route>
          <Route path="/subscribe">
            <Subscribe />
          </Route>
          <Route path="/facebook">
            <Facebook />
          </Route>
          <Route path="/group">
            <Group />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Paper>
    </div >
  );
}

export default Content;
