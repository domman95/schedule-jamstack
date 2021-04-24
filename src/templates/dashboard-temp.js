import React, { useContext } from 'react';
import styled from 'styled-components';
import { Loading } from '../components/styles/loading';
import { Context } from '../pages/app';

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

  .loading,
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
            <p className="title">Your data:</p>
            <ul>
              {currentUserData.user_metadata ? (
                currentUserData.user_metadata.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))
              ) : (
                <p className="noData">There's no data yet.</p>
              )}
            </ul>
          </div>
        </>
      ) : (
        <Loading className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Loading>
      )}
    </Container>
  );
}
