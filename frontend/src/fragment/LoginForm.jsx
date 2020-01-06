import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Copyright from './Copyright';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
    width: 'fit-content',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  facebook: {
    fontFamily: "Robot, sans-serif",
    fontWeight: 600,
    color: "#fff",
    display: "inline-block",
    fontSize: `calc(.27548vw + 12.71074px)`,
    textDecoration: 'none',
    transition: `background-color.3s`,
    backgroundColor: "#4c69ba",
    border: `calc(.06887vw + .67769px) solid #4c69ba`,
  }
});

const AppId = {
  google: "1044036390602-kaphlee0d5a759ana5e22rntn4kuh4pu.apps.googleusercontent.com",
  facebook: "826100854489381"
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  static propTypes = {
    prop: PropTypes
  };

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleGoogleSuccess = (data) => {
    const user = {
      email: data.profileObj.email,
      name: data.profileObj.name,
      imageUrl: data.profileObj.imageUrl,
    };
    this.props.onUpdateUser(user);
    this.handleClose();
  }

  handleGoogleFailure = (error) => {
    console.error(error);
  }

  handleFacebook = (data) => {
    const user = {
      email: data.email,
      name: data.name,
      imageUrl: data.picture.data.url,
    };
    this.props.onUpdateUser(user);
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        <Dialog open={open} scroll="body" onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    Sign In
                  </Button>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FacebookLogin
                        appId={AppId.facebook}
                        fields="name,email,picture"
                        buttonText="Login with Facebook"
                        cssClass={classes.facebook}
                        callback={this.handleFacebook}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <GoogleLogin
                        clientId={AppId.google}
                        onSuccess={this.handleGoogleSuccess}
                        onFailure={this.handleGoogleFailure}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    )
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
