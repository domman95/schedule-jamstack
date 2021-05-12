import React, { useEffect } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../context';

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 20;
  background-color: white;
  box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.25);
  transform: translateX(110%);
  border-radius: 1rem;
  padding: 2.5rem 3rem;
  animation: show 5s linear forwards;

  .cross {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border: none;
    background-color: transparent;
    font-size: 2rem;
    cursor: pointer;
  }

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
      failed ? '2px solid coral' : '2px solid lightgreen'};
    border-radius: 1rem;
  }

  .text {
    font-size: 1.6rem;
    padding-left: 1rem;
    max-width: 240px;
  }

  @keyframes show {
    0% {
      transform: translateX(110%);
    }

    5% {
      transform: translateX(0);
    }

    95% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(110%);
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
      }, 6000);
    }

    clearMessage();

    return function cleanup() {
      clearTimeout(clearMessage);
    };
  }, [isMessage, setMessage, setTextMessage, setIsFailed]);

  return (
    <Container failed={isFailed}>
      <div className="sign">
        {isFailed ? (
          <p className="mark">&#10007;</p>
        ) : (
          <p className="mark">&#10003;</p>
        )}
      </div>
      <p className="text">{textMessage}</p>
      <button onClick={() => setMessage(false)} className="cross">
        {String.fromCharCode(215)}
      </button>
    </Container>
  );
}
