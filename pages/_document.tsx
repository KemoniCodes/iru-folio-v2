import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
  return (
    <Html lang="en" className='my-4 mx-8'>
      <Head>
        <link rel='shortcut icon' href='/SUBMARK.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
