import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 10;
`;

const ModalStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  background-color: white;
  z-index: 10;
  padding: 5rem 2rem 2rem;

  .header {
    font-size: 1.8rem;
    border-bottom: 1px solid #cecece;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .cross {
    position: absolute;
    width: 3.6rem;
    height: 3.6rem;
    top: 1rem;
    right: 1rem;
    font-size: 3rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

export default function Modal({ children, setShowModal }) {
  return (
    <Background>
      <ModalStyled>
        <button className="cross" onClick={() => setShowModal(false)}>
          {String.fromCharCode(215)}
        </button>
        {children}
      </ModalStyled>
    </Background>
  );
}
