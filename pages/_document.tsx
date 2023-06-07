import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
  return (
    <Html lang="en" className='mb-4 mx-8'>
      <Head>
        <link rel='shortcut icon' sizes="196x196" href='/IRU-CIRCLE.svg' />
        <meta name="p:domain_verify" content="dd21365f117c2771a52685cbcce242a1" />
        <title>Iru Studios | Embracing Simplicity: Minimalistic Web and Brand Design Innovations</title>
        <meta
          name="description"
          content="Transform your brand with Iru Studios, a leading design agency specializing in minimalistic web and brand design solutions. We create sleek and contemporary designs that resonate with modern businesses, conveying simplicity and sophistication. Our innovative approach combines clean aesthetics, intuitive user experiences, and strategic branding to elevate your online presence. Discover how our minimal design philosophy can captivate your audience and drive your business forward." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
