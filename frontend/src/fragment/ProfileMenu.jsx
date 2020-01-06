import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import IconButton from '@material-ui/core/IconButton';
import LoginForm from './LoginForm';
import UserSetting from './UserSetting';
import { UserConsumer } from '../context/UserContext';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2)
  },
});

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    // This binding is necessary to make `this` work in the callback
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  static propTypes = {
    prop: PropTypes
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  handleLogin = (callback) => {
    this.refs.loginRef.handleOpen(callback);
  }

  handleLogout = () => {
    this.setState(state => ({ isAuthen: false }));
  };

  handleOpenSettings = () => {
    return;
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const loginRef = React.createRef(null);
    const userSettingRef = React.createRef(null);

    return (
      <UserConsumer>
        {({ user, settings, ...context }) => (
          <React.Fragment>
            <LoginForm ref={loginRef} {...context} />
            <UserSetting ref={userSettingRef} {...context} />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-account-menu"
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={this.handleToggle}>
              {(!user || !user.email) ?
                (<AccountBoxIcon style={{ color: "#fff", fontSize: '2rem' }} />) :
                (<Tooltip title={user.name}>
                  <Avatar alt={user.name} src={user.imageUrl} />
                </Tooltip>)}
            </IconButton>
            <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList>
                        {(!user || !user.email) ?
                          (<><MenuItem onClick={(e) => { loginRef.current.handleOpen() }}>Register/Sign In</MenuItem></>) :
                          (<><MenuItem onClick={(e) => { userSettingRef.current.handleOpen() }}>User Settings</MenuItem>
                            <MenuItem onClick={(e) => { context.onUserLogoff() }}>Sign Out</MenuItem></>)}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </React.Fragment>
        )}
      </UserConsumer>
    );
  }
}

ProfileMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileMenu);