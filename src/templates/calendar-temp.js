import React from 'react';
import styled from 'styled-components';
import Calendar from '../components/calendar';
import Schedule from '../components/schedule';
import Workers from '../components/workers';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 100%;

  #calendar,
  #workers,
  #schedule {
    background-color: white;
    border-radius: 1rem;
    margin: 1rem 2rem;
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
