import React from 'react';
import { Router } from '@reach/router';
import Layout from '../components/layout';
import PrivateRoute from '../components/private-route';
import Dashboard from '../components/dashboard';

export default function App() {
  return (
    <Layout>
      <Router basepath="/app">
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Router>
    </Layout>
  );
}
