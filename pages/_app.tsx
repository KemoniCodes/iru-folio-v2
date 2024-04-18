import '@/styles/globals.css'
import * as React from "react";
import type  AppProps  from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import { ChakraProvider } from '@chakra-ui/react'
import { motion, AnimatePresence } from "framer-motion";
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

export default function App({ Component, pageProps, router }: typeof AppProps) {
  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 200,
    when: "afterChildren"
  };

  return (
    <ChakraProvider>
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
          <Analytics />
          <Footer />
        </motion.div>
      </AnimatePresence>
    </ChakraProvider>
  )
}
