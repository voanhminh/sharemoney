import React from 'react';
import { UserConsumer } from './UserContext';

export const withUserConsumer = (Component) => {
  return function fn(props) {
    return (
      <UserConsumer>
        {(user, settings) => <Component {...props} {...user} {...settings} />}
      </UserConsumer>
    );
  };
};
