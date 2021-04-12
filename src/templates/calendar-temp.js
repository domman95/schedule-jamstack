import React from 'react';
import styled from 'styled-components';
import Calendar from '../components/calendar';
import Schedule from '../components/schedule';
import Workers from '../components/workersList';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 100%;
  gap: 2rem;
  padding: 2rem 0;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto auto 500px;

    #calendar,
    #workers,
    #schedule {
      grid-column: 1 / -1;
    }

    #calendar {
      grid-row: 1 / 2;
    }

    #workers {
      grid-row: 2 / 3;
    }

    #schedule {
      grid-row: 3 / -1;
    }
  }

  #calendar,
  #workers,
  #schedule {
    border-radius: 1rem;
    margin: 0 2rem;
  }

  #calendar,
  #workers {
    background-color: white;
  }
`;

export default function CalendarTemp() {
  return (
    <Container>
      <Calendar />
      <Workers />
      <Schedule />
    </Container>
  );
}
