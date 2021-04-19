import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../pages/app';
import { hours } from '../utils/hours';
import moment from 'moment';
import { devices } from '../utils/breakpoints';

const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 1rem 0;

    .currentScheduleDate {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;

      .headTitle {
        font-weight: bold;
        font-size: 1.8rem;
      }

      .calendarPrevNextDateButtons {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 2rem;

        button {
          font-size: 2.6rem;
          border: none;
          background-color: transparent;
          cursor: pointer;
          color: var(--blue);

          &.nextWeek {
            margin-left: 2rem;
          }
        }
      }
    }

    .manageScheduleButtons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-bottom: 1rem;

      .select,
      .addVisit {
        font-size: 1.6rem;
        padding: 1rem 2.5rem;
        border-radius: 1rem;
        border: none;
        cursor: pointer;
        flex: 1;
      }

      .select {
        background-color: white;
      }

      .addVisit {
        background-color: var(--blue);
        color: white;
        margin-left: 1rem;
      }
    }
  }

  @media ${devices.laptop} {
    padding: 0 0 0 2rem;

    .header {
      flex-direction: row;

      .currentScheduleDate {
        align-items: center;
        justify-content: flex-start;

        .headTitle {
          font-size: 2.4rem;
        }
      }
    }

    .manageScheduleButtons {
      justify-content: center;
    }
  }
`;

const ScheduleMain = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 300px);
  grid-template-rows: auto;
  flex: 1;
  max-height: 700px;
  border-radius: 1rem;
  background-color: white;
  overflow-y: scroll;
  overflow-x: visible;
  height: 100%;

  @media ${devices.laptop} {
    max-height: 100%;
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
        margin-bottom: 0.5rem;
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

const oneDay = [moment()]; // for tests - how looks one day view

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

  const getVisitDateTime = (date, g, m) => {
    const day = date.format('MM DD YYYY');
    const full = `${day} ${g}:${m}:00`;
    const currentStringOfDate = moment(full)._d;

    return moment(currentStringOfDate, true);
  };

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
        {calendar.map((date) => (
          <div className="day" key={date.format('DD/MM/YYYY')}>
            <div className="label">
              <p className="number">{date.format('DD')}</p>
              <p className="name">{date.format('dddd')}</p>
            </div>
            <div className="column">
              {hours.map(({ g, m }) => {
                const test = getVisitDateTime(date, g, m);
                return (
                  <Hour
                    key={getVisitDateTime(date, g, m)}
                    className="hour"
                    onClick={() => console.log(test)}>
                    {`${g}:${m}`}
                  </Hour>
                );
              })}
            </div>
          </div>
        ))}
      </ScheduleMain>
    </ScheduleWrapper>
  );
}
