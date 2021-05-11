import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../context';

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: ${({ failed }) => (failed ? 'coral' : 'palegreen')};
  border-left: ${({ failed }) =>
    failed ? '10px solid crimson' : '10px solid lightgreen'};
  z-index: 20;
  transform: translateX(110%);
  border-radius: 1rem;
  padding: 2.5rem 3rem;
  animation: show 0.3s ease-in forwards;

  p {
    font-size: 1.6rem;
  }

  @keyframes show {
    from {
      transform: translateX(110%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export default function Message() {
  const {
    isMessage,
    setMessage,
    textMessage,
    setTextMessage,
    isFailed,
    setIsFailed,
  } = useContext(Context);

  useEffect(() => {
    function clearMessage() {
      setTimeout(() => {
        setMessage(false);
        setTextMessage('');
        setIsFailed(false);
      }, 3000);
    }

    clearMessage();

    return function cleanup() {
      clearTimeout(clearMessage);
    };
  }, [isMessage]);

  return (
    <>
      {isMessage && (
        <Container failed={isFailed}>
          <p>{textMessage}</p>
        </Container>
      )}
    </>
  );
}
