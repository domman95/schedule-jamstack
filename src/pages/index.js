import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Nav from '../components/nav';

const Main = styled.main`
  padding-top: 7rem;

  p {
    font-size: 2rem;
  }
`;

export default function HomePage() {
  const [alert, setAlert] = useState('nothing');

  const test = () => {
    fetch('/.netlify/functions/boop')
      .then((res) => res.json())
      .then((data) => {
        const { message } = data;
        setAlert(message);
      });
  };

  return (
    <Layout>
      <Nav />
      <Main>
        <button onClick={test}>Run Serverless Function</button>
        <p>{alert}</p>
      </Main>
    </Layout>
  );
}
