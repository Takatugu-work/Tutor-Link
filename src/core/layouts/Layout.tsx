import Head from 'next/head';
import React, { FC } from 'react';
import { BlitzLayout } from '@blitzjs/next';
import { Navbar } from '../components/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'src/util/defaultTheme';

export const dynamic = 'force-dynamic';
const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Tutor Link</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main>{children}</main>
      </ThemeProvider>
    </>
  );
};

export default Layout;
