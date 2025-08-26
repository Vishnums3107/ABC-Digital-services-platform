import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  body {
    background-color: #f7fafc;
    color: #2d3748;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    transition: all 0.2s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #1a202c;
  }
`;

export default GlobalStyle;