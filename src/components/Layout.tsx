import React, { ReactNode } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  height: 1em;
`;

const Layout = ({
  children,
  title = 'This is the default title',
}: Props): JSX.Element => (
  <Container>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>{children}</main>

    <footer>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <Logo src="/vercel.svg" alt="Vercel Logo" />
      </a>
    </footer>
  </Container>
);

export default Layout;
