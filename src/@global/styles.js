import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color:${(p) => p.theme.palette.background.default};
    color:${(p) => p.theme.palette.text.primary};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  input:focus, textarea:focus, select:focus, button:focus{
        outline: none;
  }
  
  figure {
    margin:0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
  }

  ul, li {
    margin:0;
    padding:0;
  }

  a {
    cursor: pointer;
  }

`;
