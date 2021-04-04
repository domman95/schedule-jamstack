import React from 'react';
import styled from 'styled-components';
import Layout from './layout';
import Nav from './nav';

const Main = styled.main`
  padding-top: 7rem;
`;

export default function Calendar() {
  return (
    <Layout>
      <Nav />
      <Main>
        <h1>Calendar</h1>
      </Main>
    </Layout>
  );
}
