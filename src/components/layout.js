import React from 'react';
import { createGlobalStyle } from 'styled-components';
import netlifyIdentity from 'netlify-identity-widget';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --blue: #0075ff;
  }

  html {
    font-family: sans-serif;
    font-size: 10px;
  }
`;

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
}
