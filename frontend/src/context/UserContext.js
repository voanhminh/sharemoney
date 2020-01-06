import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Create a context object
const UserContext = React.createContext({
  user: {},
  settings: {},
  onUpdateUser: (d) => { },
  onUpdateSettings: (d) => { },
  onUserLogoff: () => { }
});

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      settings: {},
      onUpdateUser: (user) => {
        this.setState(state => ({ user: user }));
        localStorage.setItem('localuser', JSON.stringify(this.state));
      },
      onUpdateSettings: (settings) => {
        this.setState(state => ({ settings: settings }));
        localStorage.setItem('localuser', JSON.stringify(this.state));
      },
      onUserLogoff: () => {
        //clear the user settings
        localStorage.removeItem("localuser");
        this.setState(state => ({
          user: {},
          settings: {}
        }));
      }
    };
  }

  onPageRefresh = () => {
    const localuser = JSON.parse(localStorage.getItem("localuser") || '{"user":{},"settings":{}}');
    this.setState(state => ({
      user: localuser["user"],
      settings: localuser["settings"]
    }));
  }

  componentWillMount() {
    this.onPageRefresh();
  }

  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };