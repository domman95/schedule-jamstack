import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from 'pages/app';
import moment from 'moment';

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
      padding: 0 1rem;
      font-size: 1.2rem;
      /* position: absolute; */
      /* top: 0.3rem; */
      /* left: 1.5rem; */
    }

    input {
      font-size: 1.6rem;
      margin: 1rem 0;
      height: 100%;
      border-radius: 1rem;
      border: 1px solid black;
      text-align: center;
      outline: none;
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
  function formatDateIntoInputValue(value) {
    const date = moment(value).format('YYYY-MM-DD');
    const time = moment(value).format('hh:mm');

    const result = `${date}T${time}`;

    return result;
  }

  return (
    <Background>
      <Modal>
        <button className="cross" onClick={() => setShowModal(false)}>
          {String.fromCharCode(215)}
        </button>
        <h2 className="header">Add another visit</h2>
        <Form>
          <label>
            <span>Customer</span>
            <input type="text" name="customer" required />
          </label>
          <label>
            <span>Start</span>
            <input
              type="datetime-local"
              name="start"
              defaultValue={formatDateIntoInputValue(currentDate)}
              required
            />
          </label>
          <label>
            <span>End</span>
            <input
              type="datetime-local"
              name="end"
              defaultValue={formatDateIntoInputValue(currentDate)}
              required
            />
          </label>
          <input type="submit" name="" value="Add another visit" />
        </Form>
      </Modal>
    </Background>
  );
}
