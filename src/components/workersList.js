import React from 'react';
import styled from 'styled-components';
import Worker from './worker';

const WorkersWrapper = styled.div`
  grid-column: 1 / 4;
  grid-row: 3 / -1;
  max-height: 200px;
  margin: 1rem 2rem;
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

    ul {
      overflow: scroll;
      width: 100%;
    }
  }
`;

export default function Workers() {
  return (
    <WorkersWrapper id="workers">
      <div className="header">
        <p className="headTitle">Workers</p>
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
