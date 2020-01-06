import React from 'react';
import { Toolbar, IconButton, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classes = useStyles();
    const theme = useTheme();

    const menuId = 'primary-account-menu';

    const [mobileOpen, setMobileOpen] = React.useState(false);

    function handleDrawerToggle() {
      setMobileOpen(!mobileOpen);
    }

    const handleMenu = event => {
      alert('open Menu');
    };
    const handleProfileMenuOpen = event => {
      alert('open Profile');
    };
    return (
      <div>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open-menu-drawer"
              onClick={handleMenu}
              className={classes.mexxlnuButton}
            >
              <MenuOutlinedIcon />
            </IconButton>
            <Typography variant="h6">Social Media</Typography>
            <div style={{ flexGrow: 1 }} />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountBoxOutlinedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
