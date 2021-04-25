import React, { useState } from 'react';
import styled from 'styled-components';
import { devices } from 'utils/breakpoints';
import Worker from 'components/worker';

const WorkersWrapper = styled.div`
  padding: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: bold;
      font-size: 1.6rem;
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

  @media ${devices.laptop} {
    .header p {
      font-size: 1.8rem;
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

const workers = ['worker 1', 'worker 2', 'worker 3'];

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
      <form className="workersList">
        <ul>
          <Worker />
          {workers.map((name) => (
            <Worker key={name}>{name}</Worker>
          ))}
        </ul>
      </form>
    </WorkersWrapper>
  );
}
