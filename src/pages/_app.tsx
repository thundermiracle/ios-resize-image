import { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  main {
    padding: 5rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
  }

  footer {
    width: 100%;
    height: 100px;
    border-top: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  footer img {
    margin-left: 0.5rem;
  }

  footer a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 4px;
    color: #257e9c;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  code {
    background: #fafafa;
    border-radius: 5px;
    padding: 0.75rem;
    font-size: 1.1rem;
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
      DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
