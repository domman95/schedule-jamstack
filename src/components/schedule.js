import React, { useContext } from 'react';
import { Context } from 'pages/app';
import { hours } from 'utils/hours';
import { nextWeek, prevWeek } from 'utils/buildCalendar';
import {
  ScheduleMain,
  ScheduleWrapper,
} from 'components/styles/ScheduleStyles';
import { currentDate } from 'utils/currentDate';
import buildSchedule from 'utils/buildSchedule';
import { getVisitDateTime } from 'utils/getVisitDateTime';
import { Loading } from './styles/loading';
import Hour from './Hour';
import moment from 'moment';

export default function Schedule({ showModal, setShowModal }) {
  const { value, setValue, currentUserData } = useContext(Context);
  return (
    <ScheduleWrapper id="schedule">
      <div className="header">
        <div className="currentScheduleDate">
          <p className="headTitle">{currentDate(value)}</p>
          <div className="calendarPrevNextDateButtons">
            <button
              className="prevWeek"
              onClick={() => setValue(prevWeek(value))}>
              {String.fromCharCode(60)}
            </button>
            <button
              className="nextWeek"
              onClick={() => setValue(nextWeek(value))}>
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
      {currentUserData ? (
        <ScheduleMain length={hours.length}>
          {buildSchedule(value).map((date) => (
            <div className="day" key={date.format('DD/MM/YYYY')}>
              <div className="label">
                <p className="number">{date.format('DD')}</p>
                <p className="name">{date.format('dddd')}</p>
              </div>
              <div className="column">
                {hours.map(({ g, m }) => {
                  const value = getVisitDateTime(date, g, m);
                  const visits = currentUserData.user_metadata.find(
                    ({ visit }) => value.isSame(moment(visit))
                  );

                  return (
                    <Hour
                      key={getVisitDateTime(date, g, m)}
                      visits={visits}>{`${g}:${m}`}</Hour>
                  );
                })}
                {/* {hours.map(({ g, m }) => {
                  const test = getVisitDateTime(date, g, m);
                  return (
                    <Hour key={getVisitDateTime(date, g, m)} className="hour">
                      {`${g}:${m}`}
                      {currentUserData.user_metadata &&
                        currentUserData.user_metadata.map(
                          ({ visit }) =>
                            test.isSame(moment(visit)) && (
                              <Visit className="visit" />
                            )
                        )}
                    </Hour>
                  );
                })} */}
              </div>
            </div>
          ))}
        </ScheduleMain>
      ) : (
        <Loading />
      )}
    </ScheduleWrapper>
  );
}
