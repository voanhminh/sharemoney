import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { uiSetting } from '../config/theme.config';

const drawerWidth = Number(uiSetting.drawerWidth);
const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    margin: 0
  },
  makeStyles: {
    paper: {
      padding: 0,
      margin: 0
    }
  }
}));

function Youtube() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Paper elevation={1} square>
        <Typography variant="h5" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your
          application.
        </Typography>
        {[...new Array(24)]
          .map(
            () => `Cras mattis consectetur purus sit amet fermentum.
                        Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
          )
          .join('\n')}
      </Paper>
    </div>
  );
}

export default Youtube;
