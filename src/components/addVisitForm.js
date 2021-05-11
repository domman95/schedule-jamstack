import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Context } from '../context';
import addVisit from '../utils/addVisit';
import Modal from 'components/modal';

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

export default function AddVisitForm({ setShowModal, currentDate }) {
  const [visit, setVisit] = useState({
    customer: '',
    start: currentDate,
    end: moment(currentDate).clone().add(30, 'minutes'),
  });

  const { start, end } = visit;

  const {
    currentUserData,
    refreshData,
    setMessage,
    setProcessing,
    setTextMessage,
  } = useContext(Context);
  const { user_metadata } = currentUserData;
  const { customers } = user_metadata;

  useEffect(() => {
    const fullName = `${customers[0].firstName} ${customers[0].lastName}`;
    setVisit((prev) => ({ ...prev, customer: fullName }));
  }, [currentDate, customers]);

  function formatDateIntoInputValue(value) {
    const date = moment(value).format('YYYY-MM-DD');
    const time = moment(value).format('HH:mm');

    const result = `${date}T${time}`;
    return result;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email } = currentUserData;

    const match = user_metadata.visits.find((item) => {
      const currentStart = item.start;
      const currentEnd = item.end;

      // start is same as currentStart and start is same or before currentEnd
      const x =
        moment(start).isSame(currentStart) &&
        moment(start).isSameOrBefore(currentEnd);

      // start is between currentStart and currentEnd
      const y = moment(start).isBetween(currentStart, currentEnd);

      // end is same or after currentStart and start is same or before currentEnd
      const z =
        moment(end).isAfter(currentStart) && moment(start).isBefore(currentEnd);

      const result = x || y || z;

      if (result) {
        alert('This time is not available!');
        return item;
      }

      return result;
    });

    if (match) return;

    if (
      moment(start).isSame(end) ||
      moment(end).isSameOrBefore(moment(start).clone().add(29, 'minutes'))
    ) {
      alert(
        'The visit is too short! Minimum time for one visit is 30 minutes!'
      );
      return;
    }

    if (moment(start).isSameOrAfter(end)) {
      alert('The visit time is wrong! Check the end time of visit!');
      return;
    }

    setProcessing(true);

    addVisit(email, visit, user_metadata)
      .then(() => refreshData(email))
      .then(() => {
        setProcessing(false);
        setMessage(true);
        setTextMessage('The visit has been created successfully!');
      })
      .then(() => setShowModal(false))
      .catch((err) => console.log(err));
  }

  function hanldeChange(e) {
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

  return (
    <Modal>
      <button className="cross" onClick={() => setShowModal(false)}>
        {String.fromCharCode(215)}
      </button>
      <h2 className="header">Add another visit</h2>
      <Form onSubmit={handleSubmit}>
        <label>
          <span>Customer</span>
          <select name="customer" onBlur={(e) => hanldeChange(e)} required>
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
            onChange={(e) => hanldeChange(e)}
          />
        </label>
        <label>
          <span>End</span>
          <input
            type="datetime-local"
            name="end"
            value={formatDateIntoInputValue(end)}
            onChange={(e) => hanldeChange(e)}
          />
        </label>
        <input type="submit" name="" value="Add another visit" />
      </Form>
    </Modal>
  );
}
