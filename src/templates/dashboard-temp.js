import React, { useContext } from 'react';
import { Context } from '../pages/app';

export default function Dashboard() {
  const { currentUserData } = useContext(Context);
  return (
    <>
      <h1>Dashboard</h1>
      {currentUserData ? (
        currentUserData.user_metadata.map(({ name }) => <p>{name}</p>)
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
