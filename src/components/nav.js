import React, { useState } from 'react';
import { navigate, Link } from 'gatsby';
import styled from 'styled-components';
import netlifyIdentity from 'netlify-identity-widget';
import { devices } from '../utils/breakpoints';

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
  background-color: white;
  z-index: 2;

  &::before {
    display: ${({ open }) => (open ? 'block' : 'none')};
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 1;
  }

  .logo {
    font-size: 2.6rem;
    font-weight: bold;

    a {
      text-decoration: none;
      color: var(--blue);
    }
  }

  .hamburger {
    display: flex;
    position: relative;
    width: 2.5rem;
    height: 2rem;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    z-index: 1000;
    cursor: pointer;

    &.cross {
      justify-content: center;

      div {
        transition: transform 0.1s ease-in-out;
        transform-origin: center;
      }
      .second {
        position: relative;
        transform: rotate(45deg);

        &::before {
          position: absolute;
          content: '';
          width: 100%;
          height: 100%;
          background-color: black;
          transform: rotate(90deg);
        }
      }

      .first,
      .third {
        display: none;
      }
    }

    & div {
      height: 0.2rem;
      width: 100%;
      background-color: black;
      border-radius: 2.5rem;
    }

    @media (min-width: 768px) {
      display: none;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  height: calc(100% - 2rem);
  background-color: white;

  .links {
    display: flex;
    align-items: center;
    position: relative;
    flex: 1;
    height: 100%;
    padding: 0 6rem;

    &::before {
      content: '';
      position: absolute;
      height: 100%;
      left: 3rem;
      border-left: 1px solid #cecece;
    }

    a {
      position: relative;
      font-size: 1.6rem;
      color: black;
      text-decoration: none;
      overflow: hidden;
      margin-right: 2rem;
      white-space: nowrap;

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
  }

  .authentication {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;

    .userName {
      font-size: 1.6rem;
    }

    button {
      padding: 1rem 2rem;
      border: none;
      font-size: 1.6rem;
      background-color: transparent;
      cursor: pointer;

      &.login,
      &.logout {
        text-decoration: underline;
      }

      &.signup {
        border-radius: 2.5rem;
        background-color: var(--blue);
        color: white;
        margin-left: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    flex-direction: column;
    align-items: flex-start;
    top: 0;
    right: 0;
    height: 100%;
    padding: 7rem 2rem 4rem;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translate(100%)')};
    transition: transform 0.3s ease-in-out;
    min-width: 300px;
    z-index: 1;

    .links {
      flex-direction: column;
      align-items: flex-start;
      padding: 0 2rem;

      a {
        font-size: 2rem;
        margin-bottom: 2rem;
        width: 100%;
        border-bottom: 1px solid #cecece;
      }

      &::before {
        display: none;
      }
    }

    .authentication {
      flex-direction: column;
      width: 100%;

      button {
        font-size: 2rem;
      }
    }
  }
`;

const LoggedIn = (isLoggedIn) => (
  <>
    <p className="userName">Hi, {isLoggedIn.user_metadata.full_name}</p>
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
  const [open, setOpen] = useState(false);
  const isLoggedIn = netlifyIdentity.currentUser();

  netlifyIdentity.on('login', () =>
    navigate('/app/dashboard', { replace: true })
  );
  netlifyIdentity.on('logout', () => navigate('/', { replace: true }));

  return (
    <StyledNav open={open}>
      {console.log(isLoggedIn)}
      <div className="logo">
        <Link to="/">Schedule</Link>
      </div>
      <NavLinks open={open}>
        {isLoggedIn && (
          <div className="links">
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
          {isLoggedIn ? LoggedIn(isLoggedIn) : LoggedOut()}
        </div>
      </NavLinks>
      <div
        className={`hamburger ${open && 'cross'}`}
        role="button"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={() => setOpen(!open)}>
        <div className="first" />
        <div className="second" />
        <div className="third" />
      </div>
    </StyledNav>
  );
}
