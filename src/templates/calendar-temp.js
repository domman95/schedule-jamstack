import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AddVisitForm from 'components/addVisitForm';
import Calendar from 'components/calendar';
import Schedule from 'components/schedule';
import Workers from 'components/workersList';
import { devices } from 'utils/breakpoints';
import { Context } from '../context';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  #calendar,
  #workers,
  #schedule {
    border-radius: 1rem;
    grid-column: 1 / -1;
  }

  #calendar,
  #workers {
    background-color: white;
  }

  @media ${devices.laptop} {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(2, 1fr);
    height: 100%;

    #calendar {
      grid-column: 1 / 4;
      grid-row: 1 / 2;
    }

    #workers {
      grid-column: 1 / 4;
      grid-row: 2 / -1;
    }

    #schedule {
      grid-column: 4 / -1;
      grid-row: 1 / -1;
    }
  }

  // not working yet
  #workers {
    position: relative;

    &::before {
      display: flex;
      justify-content: center;
      align-items: center;
      content: 'not working yet';
      position: absolute;
      font-size: 3rem;
      color: white;
      top: 0;
      left: 0;
      border-radius: 1rem;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.45);
    }
  }
`;

export default function CalendarTemp({ height }) {
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState();
  const { value } = useContext(Context);

  useEffect(() => {
    setCurrentDate(value);
  }, [value]);

  return (
    <Container>
      <Calendar />
      <Workers height={height} />
      <Schedule
        showModal={showModal}
        setShowModal={setShowModal}
        setCurrentDate={setCurrentDate}
      />
      {showModal && (
        <AddVisitForm setShowModal={setShowModal} currentDate={currentDate} />
      )}
    </Container>
  );
}
