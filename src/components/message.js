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
  background-color: palegreen;
  border-left: 10px solid lightgreen;
  z-index: 20;
  transform: translateX(110%);
  border-radius: 1rem;
  padding: 2.5rem 4rem;
  animation: show 0.3s ease-in forwards;

  p {
    font-size: 1.4rem;
    max-width: 240px;
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
  const { isMessage, setMessage, textMessage, setTextMessage } = useContext(
    Context
  );

  useEffect(() => {
    function clearMessage() {
      setTimeout(() => {
        setMessage(false);
        setTextMessage('');
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
        <Container>
          <p>{textMessage}</p>
        </Container>
      )}
    </>
  );
}
