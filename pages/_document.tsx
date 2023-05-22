import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
  return (
    <Html lang="en" className='mb-4 mx-8'>
      <Head>
        <link rel='shortcut icon' sizes="196x196" href='/IRU-CIRCLE.svg'/>
        <meta name="p:domain_verify" content="dd21365f117c2771a52685cbcce242a1"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
