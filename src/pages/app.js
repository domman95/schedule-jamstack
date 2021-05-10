import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';
import Layout from 'components/layout';
import PrivateRoute from 'components/private-route';
import Dashboard from 'templates/dashboard-temp';
import Calendar from 'templates/calendar-temp';
import CustomerCards from 'templates/customer-cards-temp';
import netlifyIdentity from 'netlify-identity-widget';
import styled from 'styled-components';
import Nav from 'components/nav';
import moment from 'moment';

const AppWrapper = styled.main`
  padding: 9rem 2rem 2rem;
  height: 100vh;
`;

export const Context = React.createContext();

export default function App({ location }) {
  const [value, setValue] = useState(moment());
  const [newVisit, setNewVisit] = useState({});
  const [contextData, setContextData] = useState({
    setValue,
    newVisit,
    setNewVisit,
    refreshData,
  });

  useEffect(() => {
    const isLoggedIn = netlifyIdentity.currentUser();

    if (!isLoggedIn && location.pathname !== '/app/') {
      navigate('/');
      return null;
    }

    const { email } = isLoggedIn;
    const { full_name } = isLoggedIn.user_metadata;

    checkIsFirstLogIn(email, full_name)
      .then((res) => res.json())
      .then((data) =>
        setContextData({ ...contextData, currentUserData: data })
      );
  }, []);

  async function checkIsFirstLogIn(userEmail, fullName) {
    const result = await fetch('/.netlify/functions/get-current-database', {
      method: 'GET',
      headers: {
        email: userEmail,
        name: fullName,
      },
    });

    return result;
  }

  async function refreshData(userEmail) {
    const email = userEmail;

    const result = await fetch('/.netlify/functions/refresh-data', {
      method: 'GET',
      headers: {
        email,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setContextData({ ...contextData, currentUserData: data })
      );

    return result;
  }

  return (
    <Layout>
      <Nav />
      <Context.Provider value={{ ...contextData, value }}>
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
