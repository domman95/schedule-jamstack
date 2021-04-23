import React, { useContext } from 'react';
import { Context } from '../pages/app';
import { hours } from '../utils/hours';
import { nextMonth, prevMonth } from '../utils/buildCalendar';
import { Hour, ScheduleMain, ScheduleWrapper } from './styles/ScheduleStyles';
import { currentDate } from '../utils/currentDate';
import buildSchedule from '../utils/buildSchedule';
import { getVisitDateTime } from '../utils/getVisitDateTime';

export default function Schedule({ showModal, setShowModal }) {
  const { value, setValue } = useContext(Context);

  async function updateCompaniesData() {
    const result = await fetch('/.netlify/functions/update-data', {
      method: 'POST',
    });

    console.log(result);

    return result;
  }

  return (
    <ScheduleWrapper id="schedule">
      <div className="header">
        <div className="currentScheduleDate">
          <p className="headTitle">{currentDate(value)}</p>
          <div className="calendarPrevNextDateButtons">
            <button
              className="prevWeek"
              onClick={() => setValue(prevMonth(value))}>
              {String.fromCharCode(60)}
            </button>
            <button
              className="nextWeek"
              onClick={() => setValue(nextMonth(value))}>
              {String.fromCharCode(62)}
            </button>
          </div>
        </div>
        <div className="manageScheduleButtons">
          <button className="addVisit" onClick={() => updateCompaniesData()}>
            Add another visit
          </button>
        </div>
      </div>
      <ScheduleMain length={hours.length}>
        {buildSchedule(value).map((date) => (
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
