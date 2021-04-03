import React from 'react';
import { navigate } from 'gatsby';
import netlifyIdentity from 'netlify-identity-widget';

export default function PrivateRoute({
  component: Component,
  location,
  ...rest
}) {
  const isLoggedIn = netlifyIdentity.currentUser();

  if (!isLoggedIn && location.pathname === '/dashboard') {
    navigate('/', { replace: true });
    return null;
  }

  return <Component {...rest} />;
}
