import React from 'react';
import styled from 'styled-components';
import { Loading } from './styles/loading';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 1000;
`;

export default function ProcessingData() {
  return (
    <Container>
      <Loading />
    </Container>
  );
}
