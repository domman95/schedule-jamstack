import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../pages/app';
import { hours } from '../utils/hours';

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
  max-height: calc(100% - 60px);
  overflow-y: scroll;

  .day {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    flex: 1;

    .label {
      background-color: white;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 1.5rem 0;
      gap: 0.5rem;
      position: sticky;
      top: 0;
      left: 0;

      .number {
        font-size: 2.6rem;
        color: var(--blue);
        opacity: 0.75;
      }

      .name {
        font-size: 1.2rem;
        text-transform: uppercase;
        color: #cecece;
        font-weight: bold;
      }
    }

    &:nth-last-child(1) .column {
      border-right: none;
    }

    .column {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: ${({ length }) => `repeat(${length}, 100px)`};
      border-right: 1px solid #f2f2f2;
    }
  }
`;

const Hour = styled.div`
  border-top: 1px solid #f2f2f2;
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

  const startWeek = value.clone().startOf('week');
  const endWeek = value.clone().endOf('week');
  const day = startWeek.clone().subtract(1, 'day');
  const calendar = [];

  while (day.isBefore(endWeek, 'day')) {
    calendar.push(day.add(1, 'day').clone());
  }

  return (
    <ScheduleWrapper id="schedule">
      {console.log(calendar)}
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
      <ScheduleMain length={hours.length}>
        {calendar.map((item) => (
          <div className="day">
            <div className="label">
              <p className="number">{item.format('DD')}</p>
              <p className="name">{item.format('dddd')}</p>
            </div>
            <div className="column">
              {hours.map((item) => (
                <Hour value={item} />
              ))}
            </div>
          </div>
        ))}
      </ScheduleMain>
    </ScheduleWrapper>
  );
}
