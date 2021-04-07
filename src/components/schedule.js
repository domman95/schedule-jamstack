import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../pages/app';

const ScheduleWrapper = styled.div`
  grid-column: 4 / -1;
  grid-row: 1 / -1;
`;

export default function Schedule() {
  const { value } = useContext(Context);

  return (
    <ScheduleWrapper id="schedule">
      {value.format('DD-MM-YYYY')}
    </ScheduleWrapper>
  );
}
