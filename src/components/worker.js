import React from 'react';
import styled from 'styled-components';

const StyledWorker = styled.li`
  list-style: none;
  font-size: 1.6rem;
  padding: 0.5rem;
  border-bottom: 1px solid #cecece;

  label {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export default function Worker({ children }) {
  return (
    <StyledWorker>
      <label>
        <input type="checkbox" />
        {children}
      </label>
    </StyledWorker>
  );
}
