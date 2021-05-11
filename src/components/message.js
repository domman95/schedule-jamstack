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
  z-index: 20;
  background-color: white;
  transform: translateX(110%);
  border-radius: 1rem;
  padding: 2.5rem 3rem;
  animation: show 0.3s ease-in forwards;

  .sign {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: ${({ failed }) => (failed ? 'coral' : 'lightgreen')};

    .mark {
      font-size: 1.6rem;
      color: white;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    height: 80%;
    border: ${({ failed }) =>
      failed ? '4px solid coral' : '4px solid lightgreen'};
    border-radius: 1rem;
  }

  .text {
    font-size: 1.6rem;
    padding-left: 1rem;
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
      }, 5000);
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
          <div className="sign">
            {isFailed ? (
              <p className="mark">&#10008;</p>
            ) : (
              <p className="mark">&#10004;</p>
            )}
          </div>
          <p className="text">{textMessage}</p>
        </Container>
      )}
    </>
  );
}
