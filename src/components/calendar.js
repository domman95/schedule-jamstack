import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import buildCalendar from '../utils/buildCalendar';

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${({ length }) => `repeat(${length + 1}, 1fr)`};
  height: 100%;
  padding: 2rem 0;
  gap: 1rem;
  font-size: 1.6rem;

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
    gap: 1rem;

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
        color: white;
        font-weight: bold;
        background-color: #0075ff;
        border-radius: 50%;
        width: 3.5rem;
        height: 3.5rem;
      }

      &.selected {
        background-color: #cecece;
        border-radius: 50%;
        width: 3.5rem;
        height: 3.5rem;
      }
    }
  }
`;

export default function Calendar() {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  const [today] = useState(value);

  const prevMonth = () => value.clone().subtract(1, 'month');
  const nextMonth = () => value.clone().add(1, 'month');

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <>
      <div className="header">
        <p className="headTitle">{value.format('MMMM YYYY')}</p>
        <div className="buttons">
          <div className="prevDate" onClick={() => setValue(prevMonth())} />
          <div className="nextDate" onClick={() => setValue(nextMonth())} />
        </div>
      </div>
      <CalendarContainer length={calendar.length}>
        {calendar.length > 0 && (
          <>
            <div className="namesOfDays">
              {calendar[0].map((week) => (
                <div className="dayName">{week.format('ddd')}</div>
              ))}
            </div>
            {calendar.map((week) => (
              <div className="weeks">
                {week.map((day) => (
                  <div
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
    </>
  );
}
