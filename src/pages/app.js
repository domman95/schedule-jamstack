import React from 'react';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';
import Layout from '../components/layout';
import PrivateRoute from '../components/private-route';
import Dashboard from '../components/dashboard';
import Calendar from '../components/calendar';
import CustomerCards from '../components/customer-cards';
import netlifyIdentity from 'netlify-identity-widget';

export default function App({ location }) {
  const isLoggedIn = netlifyIdentity.currentUser();

  if (!isLoggedIn && location.pathname !== '/app/') {
    navigate('/');
    return null;
  }

  console.log(isLoggedIn);

  return (
    <Layout>
      <Router>
        <PrivateRoute path="/app/dashboard" component={Dashboard} />
        <PrivateRoute path="/app/calendar" component={Calendar} />
        <PrivateRoute path="/app/customer-cards" component={CustomerCards} />
      </Router>
    </Layout>
  );
}
