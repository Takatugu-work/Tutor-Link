import { BlitzLayout } from '@blitzjs/next';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import React from 'react';
import { theme } from 'src/util/defaultTheme';
import { Navbar } from '../components/Navbar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const dynamic = 'force-dynamic';
const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Tutor Link</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
};

export default Layout;
