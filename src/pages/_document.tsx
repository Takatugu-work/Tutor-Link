import Document, { Head, Html, Main, NextScript } from 'next/document';
import Link from 'next/link';
import { Suspense } from 'react';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Link rel="preconnect" href="https://fonts.googleapis.com" />
          <Link rel="preconnect" href="https://fonts.gstatic.com" />
          <Link
            href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
