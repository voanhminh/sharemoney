import React from 'react';
import { Container, Grid } from '@material-ui/core';
import DrawerMenu from './component/DrawerMenu';
import Content from "./component/Content";
import ScrollTop from './fragment/ScrollToTop';
import { UserProvider } from './context/UserContext';

class App extends React.Component {

  render() {
    return (
      <UserProvider>
        <Container maxWidth="xl" style={{ flex: 1, padding: 0 }}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignitems="stretch">
            <Grid item xs={12}>
              <DrawerMenu />
            </Grid>
            <Grid item xs={12}>
              <Content />
            </Grid>
          </Grid>
          <ScrollTop />
        </Container>
      </UserProvider>
    );
  }
}

export default App;
