import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --blue: #0075ff;
  }

  // set height 100% for @reach/router's rendered divs
  div [tabindex]{
    height: 100%;
  }

  html {
    font-family: sans-serif;
    font-size: 10px;
    background-color: #f5f5f5;
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
