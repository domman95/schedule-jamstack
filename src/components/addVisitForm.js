import React from 'react';
import styled from 'styled-components';
import { devices } from '../utils/breakpoints';

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 10;

  @media ${devices.laptop} {
    width: 80vw;
    height: 80vh;
    border-radius: 1rem;
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

export default function AddVisitForm({ setShowModal }) {
  return (
    <Background>
      <Modal>
        <button className="cross" onClick={() => setShowModal(false)}>
          {String.fromCharCode(215)}
        </button>
      </Modal>
    </Background>
  );
}
