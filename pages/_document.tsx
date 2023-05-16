import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
  return (
    <Html lang="en" className='my-4 mx-8'>
      <Head>
        <link rel='shortcut icon' href='/IRU-CIRCLE.png'/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
