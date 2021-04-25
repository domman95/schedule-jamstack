import React from 'react';
import styled from 'styled-components';
import Layout from 'components/layout';
import Nav from 'components/nav';

const Main = styled.main`
  padding-top: 7rem;

  p {
    font-size: 2rem;
  }
`;

export default function HomePage() {
  return (
    <Layout>
      <Nav />
      <Main></Main>
    </Layout>
  );
}
