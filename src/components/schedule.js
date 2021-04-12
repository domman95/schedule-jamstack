import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../pages/app';
import { hours } from '../utils/hours';

const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 4 / -1;

  @media (max-width: 768px) {
    align-self: flex-start;

    .header {
      flex-direction: column;
      gap: 2rem;

      .currentScheduleDate {
        width: 100%;
        justify-content: space-between;
        padding: 0 1rem;
      }
    }

    .manageScheduleButtons {
      justify-content: space-between;
      width: 100%;
      padding: 0 1rem;

      .select,
      .addVisit {
        flex: 1;
      }
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0 2rem;

    .currentScheduleDate {
      display: flex;
      align-items: center;
      gap: 1rem;

      .headTitle {
        font-weight: bold;
        font-size: 2.4rem;
      }

      .calendarPrevNextDateButtons {
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

    .manageScheduleButtons {
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
  grid-template-columns: repeat(7, 200px);
  grid-template-rows: auto;
  flex: 1;
  /* margin-top: 2rem; */
  border-radius: 1rem;
  background-color: white;
  max-height: calc(100% - 60px);
  overflow-y: scroll;
  overflow-x: visible;

  @media (max-width: 768px) {
    max-height: 700px;
    margin-bottom: 2rem;
  }

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
      z-index: 1;
      border-bottom: 1px solid var(--blue);
      border-right: 1px solid #f2f2f2;

      .number {
        font-size: 3.2rem;
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
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(206, 206, 206, 0.25);
  border-top: 1px solid #f2f2f2;
  font-weight: bold;
  font-size: 4.4rem;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: rgba(0, 117, 255, 0.25);
  }
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
      <div className="header">
        <div className="currentScheduleDate">
          <p className="headTitle">{currentDate()}</p>
          <div className="calendarPrevNextDateButtons">
            <button className="prevWeek">{String.fromCharCode(60)}</button>
            <button className="nextWeek">{String.fromCharCode(62)}</button>
          </div>
        </div>
        <div className="manageScheduleButtons">
          <select className="select" defaultChecked="week">
            <option label="week" />
            <option label="day" />
          </select>
          <button className="addVisit">{String.fromCharCode(43)} add</button>
        </div>
      </div>
      <ScheduleMain length={hours.length}>
        {calendar.map((day) => (
          <div className="day">
            <div className="label">
              <p className="number">{day.format('DD')}</p>
              <p className="name">{day.format('dddd')}</p>
            </div>
            <div className="column">
              {hours.map((hour) => (
                <Hour className="hour" onClick={() => console.log(day)}>
                  {hour}
                </Hour>
              ))}
            </div>
          </div>
        ))}
      </ScheduleMain>
    </ScheduleWrapper>
  );
}
