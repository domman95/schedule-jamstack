import React, { useState } from 'react';
import styled from 'styled-components';
import Worker from './worker';

const WorkersWrapper = styled.div`
  grid-column: 1 / 4;
  grid-row: 3 / -1;
  height: auto;
  align-self: center;
  max-height: 200px;
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
      gap: 20px;

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
    display: flex;
    margin: 1rem 0;
    height: calc(100% - 40px);

    @media (max-width: 768px) {
      display: ${({ show }) => (show ? 'flex' : 'none')};
    }

    ul {
      overflow: scroll;
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
        </ul>
      </div>
    </WorkersWrapper>
  );
}
