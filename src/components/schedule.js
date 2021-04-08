import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../pages/app';

const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 4 / -1;
  grid-row: 1 / -1;
  padding: 1rem 2rem 0;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .currentScheduleDate {
      display: flex;
      align-items: center;
      gap: 1rem;

      .headTitle {
        font-weight: bold;
        font-size: 2.4rem;
      }

      .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;

        button {
          font-size: 2.6rem;
          border: none;
          background-color: transparent;
          cursor: pointer;
          color: var(--blue);
        }
      }
    }

    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      .select,
      .addVisit {
        font-size: 1.6rem;
        padding: 1rem 2.5rem;
        border-radius: 1rem;
        border: none;
        cursor: pointer;
      }

      .select {
        background-color: white;
      }

      .addVisit {
        background-color: var(--blue);
        color: white;
      }
    }
  }
`;

const ScheduleMain = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto;
  flex: 1;
  margin-top: 2rem;
  border-radius: 1rem;
  background-color: white;
`;

export default function Schedule() {
  const { value } = useContext(Context);

  const currentDate = () => {
    const firstDayOfWeek = value.clone().startOf('week').format('DD');
    const lastDayOfWeek = value.clone().endOf('week').format('DD');
    const fullNameOfCurrentMonth = value.format('MMMM');
    const currentYear = value.format('YYYY');

    return `${fullNameOfCurrentMonth} ${firstDayOfWeek} - ${lastDayOfWeek}, ${currentYear}`;
  };

  return (
    <ScheduleWrapper id="schedule">
      <div className="header">
        <div className="currentScheduleDate">
          <p className="headTitle">{currentDate()}</p>
          <div className="buttons">
            <button className="prevWeek">{String.fromCharCode(60)}</button>
            <button className="nextWeek">{String.fromCharCode(62)}</button>
          </div>
        </div>
        <div className="buttons">
          <select className="select" defaultChecked="week">
            <option label="week" />
            <option label="day" />
          </select>
          <button className="addVisit">{String.fromCharCode(43)} add</button>
        </div>
      </div>
      <ScheduleMain></ScheduleMain>
    </ScheduleWrapper>
  );
}
