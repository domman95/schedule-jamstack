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

export default function Schedule({ showModal, setShowModal, setCurrentDate }) {
  const { value, setValue, currentUserData } = useContext(Context);
  return (
    <ScheduleWrapper id="schedule">
      {currentUserData ? (
        <>
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
              <button
                className="addVisit"
                onClick={() => setShowModal(!showModal)}>
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
                    const value = getVisitDateTime(date, g, m);
                    const visits = currentUserData.user_metadata
                      ? currentUserData.user_metadata.visits
                      : [];

                    const visit = visits.find(({ start }) => {
                      return value.isSame(moment(start));
                    });

                    return (
                      <Hour
                        key={value}
                        visit={visit}
                        value={value}
                        setShowModal={setShowModal}
                        setCurrentDate={setCurrentDate}>{`${g}:${m}`}</Hour>
                    );
                  })}
                </div>
              </div>
            ))}
          </ScheduleMain>
        </>
      ) : (
        <Loading />
      )}
    </ScheduleWrapper>
  );
}
