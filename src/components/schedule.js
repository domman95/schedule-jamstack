import React, { useContext } from 'react';
import { Context } from 'pages/app';
import moment from 'moment';
import { hours } from 'utils/hours';
import { nextMonth, prevMonth } from 'utils/buildCalendar';
import {
  Hour,
  ScheduleMain,
  ScheduleWrapper,
} from 'components/styles/ScheduleStyles';
import { currentDate } from 'utils/currentDate';
import buildSchedule from 'utils/buildSchedule';
import { getVisitDateTime } from 'utils/getVisitDateTime';

export default function Schedule({ showModal, setShowModal }) {
  const { value, setValue, currentUserData, refreshData } = useContext(Context);

  async function updateCompaniesData() {
    const email = currentUserData.email;
    const name = currentUserData.name;
    const data = currentUserData.user_metadata
      ? currentUserData.user_metadata
      : [];

    const result = await fetch('/.netlify/functions/update-data', {
      method: 'POST',
      body: JSON.stringify({
        email,
        data,
      }),
    }).then(() => refreshData(email, name));

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
          <button className="addVisit" onClick={() => setShowModal(!showModal)}>
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
                    {currentUserData &&
                      currentUserData.user_metadata &&
                      currentUserData.user_metadata.map(
                        ({ visit }) =>
                          test.isSame(moment(visit)) && (
                            <div className="visit" key={visit} />
                          )
                      )}
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
