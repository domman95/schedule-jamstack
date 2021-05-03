import React, { useState } from 'react';
import moment from 'moment';
import { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HourStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(206, 206, 206, 0.25);
  border-top: 1px solid #f2f2f2;
  font-weight: bold;
  font-size: 4.4rem;
  transition: 0.3s;
  cursor: pointer;
  width: 100%;
  height: 100%;

  &:hover {
    color: rgba(0, 117, 255, 0.25);
  }
`;

const Visit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 5px;
  left: 5px;
  width: calc(100% - 10px);
  height: ${({ length }) => length && `calc(100% * ${length} - 10px)`};
  background-color: white;
  border: 1px solid var(--blue);
  border-left: 10px solid var(--blue);
  border-radius: 1rem;
  z-index: 1;
  overflow: hidden;
  cursor: pointer;
  padding: 1rem;
  transition: transform 0.3s;

  .customer {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .time {
    font-size: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--blue);

    .separate {
      border-bottom: 1px dashed var(--blue);
      flex: 1;
      margin: 0 1rem;
    }
  }

  &:hover {
    transform: scale(1.01);
  }
`;
const INITIAL_STATE = {
  start: '',
  end: '',
  customer: '',
};

export default function Hour({ children, visit }) {
  const [state, setState] = useState(INITIAL_STATE);

  const { start, end, customer } = state;

  useEffect(() => {
    if (visit) {
      setState({ ...visit });
    }
  }, []);

  // useEffect(() => {
  //   visits && setVisit(visits.visit);
  //   console.log(visit);
  // }, []);

  function lengthOfVisit(visit) {
    const { start, end } = visit;
    const startVisit = moment(start);
    const endVisit = moment(end);
    const result = endVisit.diff(startVisit, 'minutes');
    return result / 30;
  }

  return (
    <Container>
      <HourStyled>{children}</HourStyled>
      {/* {visit ? <Visit length={lengthOfVisit(visit)} /> : null} */}
      {visit && (
        <Visit length={lengthOfVisit(visit)}>
          <p className="customer">{customer}</p>
          <div className="time">
            <p className="start">{moment(start).format('hh:mm')}</p>
            <div className="separate" />
            <p className="end">{moment(end).format('hh:mm')}</p>
          </div>
        </Visit>
      )}
    </Container>
  );
}
