import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';
import Layout from 'components/layout';
import PrivateRoute from 'components/private-route';
import Dashboard from 'templates/dashboard-temp';
import Calendar from 'templates/calendar-temp';
import Message from 'components/message';
import ProcessingData from '../components/processingData';
import CustomerCards from 'templates/customer-cards-temp';
import netlifyIdentity from 'netlify-identity-widget';
import styled from 'styled-components';
import Nav from 'components/nav';
import moment from 'moment';
import { Context } from '../context';

const AppWrapper = styled.main`
  padding: 9rem 2rem 2rem;
  height: 100vh;
`;

export default function App({ location }) {
  const [value, setValue] = useState(moment());
  const [isMessage, setMessage] = useState(false);
  const [isFailed, setIsFailed] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [contextData, setContextData] = useState({
    setValue,
    refreshData,
    setMessage,
    setIsFailed,
    setTextMessage,
    setProcessing,
  });

  const isLoggedIn = netlifyIdentity.currentUser();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const { email } = isLoggedIn;
    const { full_name } = isLoggedIn.user_metadata;

    fetch('/.netlify/functions/get-current-database', {
      method: 'GET',
      signal: signal,
      headers: {
        email,
        name: full_name,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setContextData((prev) => ({
          ...prev,
          currentUserData: data,
        }));
      })
      .then(() => {
        setMessage(true);
        setTextMessage('Data has been loaded successfully!');
      })
      .catch((err) => {
        console.log(err);
        setIsFailed(true);
      });

    return function cleanup() {
      abortController.abort();
    };
  }, [isLoggedIn]);

  if (!isLoggedIn && location.pathname !== '/app/') {
    navigate('/');
    return null;
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
      <Context.Provider
        value={{
          ...contextData,
          value,
          isMessage,
          textMessage,
          isFailed,
        }}>
        {isMessage && <Message />}
        {processing && <ProcessingData />}
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
