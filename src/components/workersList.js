import React, { useState } from 'react';
import styled from 'styled-components';
import { devices } from '../utils/breakpoints';
import Worker from './worker';

const WorkersWrapper = styled.div`
  padding: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: bold;
      font-size: 1.8rem;
    }

    & .buttons {
      display: flex;
      justify-content: center;
      align-items: center;

      .addWorker {
        font-size: 2.6rem;
        border: none;
        cursor: pointer;
        background-color: transparent;
        color: var(--blue);
      }
    }
  }

  .workersList {
    display: ${({ show }) => (show ? 'flex' : 'none')};
    max-height: 200px;
    align-self: flex-start;
    margin: 1rem 0;
    height: calc(100% - 40px);
    overflow-y: scroll;

    @media ${devices.laptop} {
      display: flex;
    }

    ul {
      width: 100%;
    }
  }
`;

export default function Workers() {
  const [show, setShow] = useState(false);
  return (
    <WorkersWrapper id="workers" show={show}>
      <div className="header">
        <p className="headTitle" onClick={() => setShow(!show)}>
          Workers
        </p>
        <div className="buttons">
          <button className="addWorker">{String.fromCharCode(43)}</button>
        </div>
      </div>
      <div className="workersList">
        <ul>
          <Worker>All</Worker>
          <Worker>Worker 1</Worker>
          <Worker>Worker 2</Worker>
          <Worker>Worker 3</Worker>
          <Worker>Worker 3</Worker>
          <Worker>Worker 3</Worker>
          <Worker>Worker 3</Worker>
          <Worker>Worker 3</Worker>
          <Worker>Worker 1</Worker>
          <Worker>Worker 2</Worker>
          <Worker>Worker 3</Worker>
          <Worker>Worker 3</Worker>
          <Worker>Worker 3</Worker>
          <Worker>Worker 3</Worker>
          <Worker>Worker 3</Worker>
        </ul>
      </div>
    </WorkersWrapper>
  );
}
