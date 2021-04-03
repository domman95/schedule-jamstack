import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #cecece;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;

  .logo {
    font-size: 2.6rem;
    font-weight: bold;
    color: var(--blue);
  }

  .authentication {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    button {
      padding: 1rem 2rem;
      border: none;
      font-size: 1.6rem;

      &.login {
        background-color: transparent;
        text-decoration: underline;
      }

      &.signup {
        border-radius: 2.5rem;
        background-color: var(--blue);
        color: white;
      }
    }
  }
`;

export default function Nav() {
  return (
    <StyledNav>
      <div className="logo">Schedule</div>
      <div className="authentication">
        <button className="login">log in</button>
        <button className="signup">sign up</button>
      </div>
    </StyledNav>
  );
}
