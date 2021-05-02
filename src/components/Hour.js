import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HourStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(206, 206, 206, 0.25);
  border-top: 1px solid #f2f2f2;
  font-weight: bold;
  font-size: 4.4rem;
  transition: 0.3s;
  cursor: pointer;
  width: 100%;
  height: 100%;

  &:hover {
    color: rgba(0, 117, 255, 0.25);
  }
`;

const Visit = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  background-color: white;
  border: 1px solid var(--blue);
  border-left: 10px solid var(--blue);
  border-radius: 1rem;
  z-index: 1;
  overflow: hidden;
`;

export default function Hour({ children, visits }) {
  const [state, setState] = useState(children);

  return (
    <Container>
      <HourStyled onClick={() => console.log(state)}>{children}</HourStyled>
      {visits ? <Visit onClick={() => console.log(visits)} /> : null}
    </Container>
  );
}
