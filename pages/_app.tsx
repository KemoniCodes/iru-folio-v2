import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Layout/Header'
import { ChakraProvider } from '@chakra-ui/react'
import Footer from '@/components/Layout/Footer'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <Header />
          <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </>
  )
}
