import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Context } from 'pages/app';

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  background-color: white;
  z-index: 10;
  padding: 5rem 2rem 2rem;

  .header {
    font-size: 1.8rem;
    border-bottom: 1px solid #cecece;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .cross {
    position: absolute;
    width: 3.6rem;
    height: 3.6rem;
    top: 1rem;
    right: 1rem;
    font-size: 3rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const Background = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 10;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem 0;
  min-width: 300px;

  label {
    /* position: relative; */
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
  }
`;

export default function AddVisitForm({ setShowModal, currentDate }) {
  const [visit, setVisit] = useState({
    customer: '',
    start: currentDate,
    end: moment(currentDate).clone().add(30, 'minutes'),
  });

  const { start, end } = visit;

  const { currentUserData } = useContext(Context);
  const { user_metadata } = currentUserData;
  const { customers } = user_metadata;

  useEffect(() => {
    const fullName = `${customers[0].firstName} ${customers[0].lastName}`;
    setVisit({ ...visit, customer: fullName });
  }, [currentDate]);

  function formatDateIntoInputValue(value) {
    const date = moment(value).format('YYYY-MM-DD');
    const time = moment(value).format('HH:mm');

    const result = `${date}T${time}`;
    return result;
  }

  function handleSubmit(e) {
    e.preventDefault();

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

    console.log(visit);
  }

  function hanldeChange(e) {
    if (e.target.name === 'customer') {
      setVisit({ ...visit, customer: e.target.value });
    }
    if (e.target.name === 'start') {
      const timeStart = moment(e.target.value);
      const timeEnd = moment(e.target.value).clone().add(30, 'minutes');

      setVisit({
        ...visit,
        start: timeStart,
        end: timeEnd,
      });
    }

    if (e.target.name === 'end') {
      const timeEnd = moment(e.target.value);

      setVisit({
        ...visit,
        end: timeEnd,
      });
    }
  }

  return (
    <Background>
      <Modal>
        <button className="cross" onClick={() => setShowModal(false)}>
          {String.fromCharCode(215)}
        </button>
        <h2 className="header">Add another visit</h2>
        <Form onSubmit={handleSubmit}>
          <label>
            <span>Customer</span>
            <select name="customer" onChange={(e) => hanldeChange(e)}>
              {currentUserData &&
                currentUserData.user_metadata &&
                currentUserData.user_metadata.customers &&
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
    </Background>
  );
}
