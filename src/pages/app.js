import React, { useState } from 'react';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';
import Layout from '../components/layout';
import PrivateRoute from '../components/private-route';
import Dashboard from '../templates/dashboard-temp';
import Calendar from '../templates/calendar-temp';
import CustomerCards from '../templates/customer-cards-temp';
import netlifyIdentity from 'netlify-identity-widget';
import styled from 'styled-components';
import Nav from '../components/nav';
import moment from 'moment';

const AppWrapper = styled.main`
  padding-top: 7rem;
  height: 100vh;
`;

export const Context = React.createContext();

export default function App({ location }) {
  const [value, setValue] = useState(moment());
  const isLoggedIn = netlifyIdentity.currentUser();

  if (!isLoggedIn && location.pathname !== '/app/') {
    navigate('/');
    return null;
  }

  return (
    <Layout>
      <Nav />
      <Context.Provider value={{ value: value, setValue: setValue }}>
        <AppWrapper>
          <Router>
            <PrivateRoute path="/app/dashboard" component={Dashboard} />
            <PrivateRoute path="/app/calendar" component={Calendar} />
            <PrivateRoute
              path="/app/customer-cards"
              component={CustomerCards}
            />
          </Router>
        </AppWrapper>
      </Context.Provider>
    </Layout>
  );
}
