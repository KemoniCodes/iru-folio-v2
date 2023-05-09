import '@/styles/globals.css'
import * as React from "react";
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { motion, AnimatePresence } from "framer-motion";
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

export default function App({ Component, pageProps, router }: AppProps) {
  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 200,
    when: "afterChildren"
  };

  return (
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          transition={spring}
          key={router.pathname}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          id="page-transition-container"
        >
          <Header />
          <Component {...pageProps} />
          <Footer />
        </motion.div>
      </AnimatePresence>
  )
}
