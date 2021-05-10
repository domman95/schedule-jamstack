import moment from 'moment';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Loading } from 'components/styles/loading';
import { Context } from '../context';

const Container = styled.div`
  margin: 0 auto;
  text-align: center;

  .data {
    padding: 2rem 0;

    .title {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 2rem;
    }

    ul li {
      list-style: none;
      font-size: 1.6rem;
      padding-bottom: 1rem;
      padding-left: 1rem;
    }
  }

  .noData {
    font-size: 1.6rem;
  }
`;

export default function Dashboard() {
  const { currentUserData } = useContext(Context);
  return (
    <Container>
      {currentUserData ? (
        <>
          <h1>Hi, {currentUserData.name}!</h1>
          <div className="data">
            <p className="title">Your visits:</p>
            <ul>
              {currentUserData.user_metadata.visits.length > 0 ? (
                currentUserData.user_metadata.visits.map(
                  ({ start, end, customer }) => (
                    <li key={start}>
                      {customer} - {moment(start).format('DD/MM/YYYY hh:mm')} -{' '}
                      {moment(end).format('hh:mm')}
                    </li>
                  )
                )
              ) : (
                <p className="noData">There's no data yet.</p>
              )}
            </ul>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
}
