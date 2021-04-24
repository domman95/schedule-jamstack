import styled from 'styled-components';
import { devices } from '../../utils/breakpoints';

export const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 1rem 0;

    .currentScheduleDate {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;

      .headTitle {
        font-weight: bold;
        font-size: 1.8rem;
      }

      .calendarPrevNextDateButtons {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 2rem;

        button {
          font-size: 2.6rem;
          border: none;
          background-color: transparent;
          cursor: pointer;
          color: var(--blue);

          &.nextWeek {
            margin-left: 2rem;
          }
        }
      }
    }

    .manageScheduleButtons {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      padding-bottom: 1rem;

      .addVisit {
        font-size: 1.6rem;
        padding: 1rem 2.5rem;
        border-radius: 1rem;
        border: none;
        cursor: pointer;
        flex: 1;
        background-color: var(--blue);
        color: white;
      }
    }
  }

  @media (min-width: 768px) {
    .header {
      flex-direction: row;

      .currentScheduleDate {
        justify-content: flex-start;
      }
    }
  }

  @media ${devices.laptop} {
    padding: 0 0 0 2rem;

    .currentScheduleDate {
      align-items: center;

      .headTitle {
        font-size: 2.4rem;
      }
    }

    .manageScheduleButtons {
      justify-content: center;

      .addVisit {
        max-width: 300px;
      }
    }
  }
`;

export const ScheduleMain = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(300px, 100%));
  grid-template-rows: auto;
  flex: 1;
  max-height: 700px;
  border-radius: 1rem;
  background-color: white;
  overflow-y: scroll;
  overflow-x: visible;
  height: 100%;

  @media ${devices.laptop} {
    max-height: 100%;
  }

  .day {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    flex: 1;

    .label {
      background-color: white;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 1.5rem 0;
      position: sticky;
      top: 0;
      left: 0;
      z-index: 2;
      border-bottom: 1px solid var(--blue);
      border-right: 1px solid #f2f2f2;

      .number {
        font-size: 3.2rem;
        color: var(--blue);
        opacity: 0.75;
        margin-bottom: 0.5rem;
      }

      .name {
        font-size: 1.2rem;
        text-transform: uppercase;
        color: #cecece;
        font-weight: bold;
      }
    }

    &:nth-last-child(1) .column {
      border-right: none;
    }

    &:nth-last-child(1) .label {
      border-top-right-radius: 1rem;
    }

    &:first-child .label {
      border-top-left-radius: 1rem;
    }

    .column {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: ${({ length }) => `repeat(${length}, 100px)`};
      border-right: 1px solid #f2f2f2;
    }
  }
`;

export const Hour = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(206, 206, 206, 0.25);
  border-top: 1px solid #f2f2f2;
  font-weight: bold;
  font-size: 4.4rem;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: rgba(0, 117, 255, 0.25);
  }

  .visit {
    position: absolute;
    top: 5px;
    width: calc(100% - 10px);
    height: calc(100% * 2 - 10px);
    /* background-color: rgba(0, 117, 255, 0.75); */
    background-color: white;
    border: 1px solid var(--blue);
    border-radius: 1rem;
    z-index: 1;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      width: 1rem;
      height: 100%;
      top: 0;
      background-color: var(--blue);
    }
  }
`;
