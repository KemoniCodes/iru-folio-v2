import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={'flex min-h-screen flex-col items-center justify-between p-24 bg-light-creme'}
    >
      <Header />
      <Footer />
    </main>
  )
}
