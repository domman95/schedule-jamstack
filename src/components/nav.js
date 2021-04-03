import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import netlifyIdentity from 'netlify-identity-widget';

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
    align-items: center;
    gap: 10px;

    .user {
      font-size: 1.6rem;
    }

    button {
      padding: 1rem 2rem;
      border: none;
      font-size: 1.6rem;
      background-color: transparent;

      &.login,
      &.logout {
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

const LoggedIn = (fullName) => (
  <>
    <p className="user">Hi, {fullName}</p>
    <button className="logout" onClick={() => netlifyIdentity.logout()}>
      log out
    </button>
  </>
);

const LoggedOut = () => (
  <>
    <button className="login" onClick={() => netlifyIdentity.open('login')}>
      log in
    </button>
    <button className="signup" onClick={() => netlifyIdentity.open('signup')}>
      sign up
    </button>
  </>
);

export default function Nav() {
  const isLoggedIn = netlifyIdentity.currentUser();

  const name =
    netlifyIdentity.currentUser() &&
    netlifyIdentity.currentUser().user_metadata &&
    netlifyIdentity.currentUser().user_metadata.full_name;

  netlifyIdentity.on('login', () => navigate('/dashboard', { replace: true }));
  netlifyIdentity.on('logout', () => navigate('/', { replace: true }));

  return (
    <StyledNav>
      <div className="logo">Schedule</div>
      <div className="authentication">
        {isLoggedIn ? LoggedIn(name) : LoggedOut()}
      </div>
    </StyledNav>
  );
}
