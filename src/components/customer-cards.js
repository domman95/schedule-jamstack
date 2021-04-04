import React from 'react';
import styled from 'styled-components';
import Layout from './layout';
import Nav from './nav';

const Main = styled.main`
  padding-top: 7rem;
`;

export default function CustomerCards() {
  return (
    <Layout>
      <Nav />
      <Main>
        <h1>Customer Cards</h1>
      </Main>
    </Layout>
  );
}
