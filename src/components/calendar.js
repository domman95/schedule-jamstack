import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import buildCalendar from '../utils/buildCalendar';
import { Context } from '../pages/app';
import { devices } from '../utils/breakpoints';

const CalendarWrapper = styled.div`
  padding: 2rem;
  margin-bottom: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: bold;
      font-size: 1.6rem;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        font-size: 2.6rem;
        border: none;
        cursor: pointer;
        color: var(--blue);
        background-color: transparent;

        &.nextDate {
          margin-left: 2rem;
        }
      }
    }
  }

  @media ${devices.laptop} {
    .header p {
      cursor: auto;
      font-size: 1.8rem;

      &:hover {
        text-decoration: none;
      }
    }
  }
`;

const CalendarContainer = styled.div`
  display: ${({ show }) => (show ? 'grid' : 'none')};
  grid-template-columns: 1fr;
  grid-template-rows: ${({ length }) => `repeat(${length + 1}, 1fr)`};
  height: 100%;
  padding: 1rem 0 2rem;
  font-size: 1.6rem;

  @media ${devices.laptop} {
    display: grid;
  }

  .namesOfDays {
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #cecece;
  }

  .weeks,
  .namesOfDays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;
    justify-items: center;

    .days {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }

      &.today {
        font-weight: bold;
        background-color: #cecece;
        border-radius: 50%;
        width: 3.5rem;
        height: 3.5rem;
      }

      &.selected {
        background-color: var(--blue);
        border-radius: 50%;
        width: 3.5rem;
        height: 3.5rem;
        color: white;
      }
    }
  }
`;

export default function Calendar() {
  const [calendar, setCalendar] = useState([]);
  const [show, setShow] = useState(false);
  const { value, setValue } = useContext(Context);
  const [today] = useState(value);

  const prevMonth = () => value.clone().subtract(1, 'month');
  const nextMonth = () => value.clone().add(1, 'month');

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <CalendarWrapper id="calendar" show={show}>
      <div className="header">
        <p className="headTitle" onClick={() => setShow(!show)}>
          {value.format('MMMM YYYY')}
        </p>
        <div className="buttons">
          <button className="prevDate" onClick={() => setValue(prevMonth())}>
            {String.fromCharCode(60)}
          </button>
          <button className="nextDate" onClick={() => setValue(nextMonth())}>
            {String.fromCharCode(62)}
          </button>
        </div>
      </div>
      <CalendarContainer length={calendar.length} show={show}>
        {calendar.length > 0 && (
          <>
            <div className="namesOfDays">
              {calendar[0].map((week) => (
                <div className="dayName" key={week._d}>
                  {week.format('ddd')}
                </div>
              ))}
            </div>
            {calendar.map((week, i) => (
              <div className="weeks" key={week[i]._d}>
                {week.map((day) => (
                  <div
                    key={day._d}
                    onClick={() => setValue(day)}
                    className={`days ${
                      today.isSame(day, 'day')
                        ? 'today'
                        : value.isSame(day, 'day') && 'selected'
                    }`}>
                    {day.format('D').toString()}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </CalendarContainer>
    </CalendarWrapper>
  );
}
