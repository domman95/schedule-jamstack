import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Context } from '../context';
import addVisit from '../utils/addVisit';
import { formatDateIntoInputValue } from '../utils/formatDateIntoInputValue';
import editVisit from '../utils/editVisit';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem 0;
  min-width: 300px;

  label {
    display: flex;
    flex-direction: column;
    height: 7.5rem;

    span {
      text-transform: uppercase;
      background-color: white;
      font-size: 1.2rem;
    }

    input,
    select {
      font-size: 1.6rem;
      margin: 1rem 0;
      height: 100%;
      border-radius: 1rem;
      border: 1px solid black;
      outline: none;
      padding-left: 1rem;
    }
  }

  input[type='submit'] {
    position: relative;
    height: 5rem;
    border-radius: 1rem;
    border: none;
    background-color: var(--blue);
    color: white;
    font-size: 1.6rem;
    margin-top: 2rem;
    cursor: pointer;
  }
`;

export default function EditVisitForm({ setShowModal, currentVisit }) {
  const [visit, setVisit] = useState({
    ...currentVisit,
  });

  const { customer, start, end } = visit;

  const {
    currentUserData,
    refreshData,
    setMessage,
    setProcessing,
    setTextMessage,
    setIsFailed,
  } = useContext(Context);
  const { user_metadata } = currentUserData;

  function handleChange(e) {
    const name = e.target.name;

    switch (name) {
      case 'customer':
        setVisit({ ...visit, customer: e.target.value });
        return;

      case 'start':
        setVisit({
          ...visit,
          start: moment(e.target.value),
          end: moment(e.target.value).clone().add(30, 'minutes'),
        });
        return;

      case 'end':
        setVisit({
          ...visit,
          end: moment(e.target.value),
        });
        return;

      default:
        return;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { email } = currentUserData;

    const match = user_metadata.visits.find((item) => {
      const existingStart = item.start; // existing visits
      const existingEnd = item.end; // existing visits

      // start is same as existing start and start is same or before existing end
      const x =
        moment(start).isSame(existingStart) &&
        moment(start).isSameOrBefore(existingEnd);

      // start is between existing start and existing end
      const y = moment(start).isBetween(existingStart, existingEnd);

      // end is same or after existing start and start is same or before existing end
      const z =
        moment(end).isAfter(existingStart) &&
        moment(start).isBefore(existingEnd);

      const result = x || y || z;

      if (result) {
        setMessage(true);
        setTextMessage('This time is not available');
        setIsFailed(true);
        return item;
      }

      return result;
    });

    if (match) return;

    if (
      moment(start).isSame(end) ||
      moment(end).isSameOrBefore(moment(start).clone().add(29, 'minutes'))
    ) {
      setMessage(true);
      setTextMessage(
        'The visit is too short! Minimum time for one visit is 30 minutes!'
      );
      setIsFailed(true);
      return;
    }

    if (moment(start).isSameOrAfter(end)) {
      setMessage(true);
      setTextMessage('The visit time is wrong! Check the end time of visit!');
      setIsFailed(true);
      return;
    }

    setProcessing(true);

    editVisit(email, visit, user_metadata)
      .then(() => refreshData(email))
      .then(() => {
        setProcessing(false);
        setMessage(true);
        setTextMessage('The visit has been updated successfully!');
      })
      .then(() => setShowModal(false))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <h2 className="header">Edit visit</h2>
      <Form onSubmit={handleSubmit}>
        <label>
          <span>Customer</span>
          <select
            defaultChecked={customer}
            name="customer"
            onBlur={(e) => handleChange(e)}
            required>
            {currentUserData.user_metadata.customers &&
              currentUserData.user_metadata.customers.map(
                ({ id, firstName, lastName }) => (
                  <option key={id}>
                    {firstName} {lastName}
                  </option>
                )
              )}
          </select>
        </label>
        <label>
          <span>Start</span>
          <input
            type="datetime-local"
            name="start"
            value={formatDateIntoInputValue(start)}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label>
          <span>End</span>
          <input
            type="datetime-local"
            name="end"
            value={formatDateIntoInputValue(end)}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <input type="submit" name="" value="Update visit" />
      </Form>
    </>
  );
}
