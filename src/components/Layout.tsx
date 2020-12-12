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
      Source Code in
      <a
        href="https://github.com/thundermiracle/ios-resize-image"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
      by
      <a
        href="https://thundermiracle.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        ThunderMiracle
      </a>
    </footer>
  </Container>
);

export default Layout;
