import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 100%;

  .calendar,
  .workers,
  .schedule {
    background-color: white;
    border-radius: 1rem;
    margin: 1rem 2rem;
  }
`;

const CalendarWrapper = styled.div`
  grid-column: 1 / 4;
  grid-row: 1 / 3;
`;

const WorkersWrapper = styled.div`
  grid-column: 1 / 4;
  grid-row: 3 / -1;
  max-height: 350px;
  margin: 1rem 2rem;
  padding: 1rem 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: bold;
      font-size: 1.8rem;
    }

    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;

      .addWorker {
        width: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;

        div {
          position: relative;
          width: 100%;
          border-bottom: 2px solid black;

          &::before {
            content: '';
            width: 100%;
            border-bottom: 2px solid black;
            position: absolute;
            transform: rotate(90deg);
          }
        }
      }

      .showList {
        width: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;

        div {
          position: relative;
          width: 100%;
          border-bottom: 2px solid black;
          transform: rotate(60deg);

          &::before {
            content: '';
            position: absolute;
            width: 100%;
            border-bottom: 2px solid black;
            transform: rotate(60deg);
            transform-origin: 100%;
          }
        }
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

      li {
        display: flex;
        align-items: center;
        gap: 1rem;
        list-style: none;
        font-size: 1.6rem;
        padding: 0.5rem;
        border-bottom: 1px solid #cecece;
      }
    }
  }
`;

const ScheduleWrapper = styled.div`
  grid-column: 4 / -1;
  grid-row: 1 / -1;
`;

export default function Calendar() {
  return (
    <Container>
      <CalendarWrapper className="calendar"></CalendarWrapper>
      <WorkersWrapper className="workers">
        <div className="header">
          <p className="headTitle">Workers</p>
          <div className="buttons">
            <div className="addWorker">
              <div />
            </div>
            <div className="showList">
              <div />
            </div>
          </div>
        </div>
        <div className="workersList">
          <ul>
            <li>
              <label>
                <input type="checkbox" />
              </label>
              All
            </li>
            <li>
              <label>
                <input type="checkbox" />
              </label>
              Worker 1
            </li>
            <li>
              <label>
                <input type="checkbox" />
              </label>
              Worker 2
            </li>
            <li>
              <label>
                <input type="checkbox" />
              </label>
              Worker 3
            </li>
          </ul>
        </div>
      </WorkersWrapper>
      <ScheduleWrapper className="schedule"></ScheduleWrapper>
    </Container>
  );
}
