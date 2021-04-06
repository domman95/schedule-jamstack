import React, { useContext } from 'react';
import styled from 'styled-components';
import CalendarComponent from '../components/calendar';
import { Context } from '../pages/app';

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

    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      div {
        width: 1.5rem;
        height: 1.5rem;
        border-bottom: 2px solid black;
        cursor: pointer;

        &.prevDate {
          border-left: 2px solid black;
          transform: rotate(45deg);
        }

        &.nextDate {
          border-right: 2px solid black;
          transform: rotate(-45deg);
        }
      }
    }
  }
`;

const WorkersWrapper = styled.div`
  grid-column: 1 / 4;
  grid-row: 3 / -1;
  max-height: 350px;
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
        list-style: none;
        font-size: 1.6rem;
        padding: 0.5rem;
        border-bottom: 1px solid #cecece;
        label {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      }
    }
  }
`;

const ScheduleWrapper = styled.div`
  grid-column: 4 / -1;
  grid-row: 1 / -1;
`;

export default function Calendar() {
  const { value, setValue } = useContext(Context);

  return (
    <Container>
      <CalendarWrapper className="calendar">
        <CalendarComponent />
      </CalendarWrapper>
      <WorkersWrapper className="workers">
        <div className="header">
          <p className="headTitle">Workers</p>
          <div className="buttons">
            <div className="addWorker" role="button">
              <div />
            </div>
          </div>
        </div>
        <div className="workersList">
          <ul>
            <li>
              <label>
                <input type="checkbox" />
                All
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                Worker 1
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                Worker 2
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                Worker 3
              </label>
            </li>
          </ul>
        </div>
      </WorkersWrapper>
      <ScheduleWrapper className="schedule">
        {value.format('DD-MM-YYYY')}
      </ScheduleWrapper>
    </Container>
  );
}
