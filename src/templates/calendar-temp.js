import React, { useState } from 'react';
import styled from 'styled-components';
import AddVisitForm from '../components/addVisitForm';
import Calendar from '../components/calendar';
import Schedule from '../components/schedule';
import Workers from '../components/workersList';
import { devices } from '../utils/breakpoints';

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
`;

export default function CalendarTemp({ height }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Calendar />
      <Workers height={height} />
      <Schedule showModal={showModal} setShowModal={setShowModal} />
      {showModal && <AddVisitForm setShowModal={setShowModal} />}
    </Container>
  );
}
