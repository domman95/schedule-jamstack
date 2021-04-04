import React from 'react';
import { navigate, Link } from 'gatsby';
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

    a {
      text-decoration: none;
      color: var(--blue);
    }
  }

  .navlinks {
    display: flex;
    align-items: center;
    position: relative;
    flex: 1;
    padding: 0 6rem;
    height: calc(100% - 2rem);
    gap: 2rem;

    a {
      position: relative;
      font-size: 1.6rem;
      color: black;
      text-decoration: none;
      overflow: hidden;

      &.active {
        font-weight: bold;
        color: #0075ff;
      }

      &.active::before {
        border-bottom: 2px solid #0075ff;
      }

      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        border-bottom: 2px solid black;
        transform: translateX(100%);
        transition: transform 0.3s;
      }

      &:hover::before {
        transform: translateX(0);
      }
    }

    &::before {
      content: '';
      position: absolute;
      height: 100%;
      left: 3rem;
      border-left: 1px solid #cecece;
    }
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

  netlifyIdentity.on('login', () =>
    navigate('/app/dashboard', { replace: true })
  );
  netlifyIdentity.on('logout', () => navigate('/', { replace: true }));

  return (
    <StyledNav>
      <div className="logo">
        <Link to="/">Schedule</Link>
      </div>
      {isLoggedIn && (
        <div className="navlinks">
          <Link to="/app/dashboard" activeClassName="active">
            dashboard
          </Link>
          <Link to="/app/calendar" activeClassName="active">
            calendar
          </Link>
          <Link to="/app/customer-cards" activeClassName="active">
            customer cards
          </Link>
        </div>
      )}
      <div className="authentication">
        {isLoggedIn ? LoggedIn(name) : LoggedOut()}
      </div>
    </StyledNav>
  );
}
