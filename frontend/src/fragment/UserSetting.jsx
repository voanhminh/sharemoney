import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
  root: {
    display: 'flex',
  }
});

class UserSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  static propTypes = {
    prop: PropTypes
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <React.Fragment>
          <Dialog open={open} scroll="body" onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
              User Settings
            </DialogContent>
          </Dialog>
        </React.Fragment>
      </div>
    )
  }
}

UserSetting.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserSetting);