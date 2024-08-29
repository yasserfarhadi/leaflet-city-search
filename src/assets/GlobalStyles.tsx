import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyles: React.FC = () => {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          font-family: Yekan, sans-serif;
        }
        body {
          width: 100vw;
          height: 100vh;
          min-height: 100vh;
          overflow-x: hidden;
        }
        #root {
          width: 100%;
          height: 100%;
        }
        .App {
          width: 100%;
          height: 100%;
        }
        a {
          text-decoration: none;
          color: unset;
        }
      `}
    />
  );
};

export default GlobalStyles;
