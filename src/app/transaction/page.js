"use client"

import Image from 'next/image'
import Script from 'next/script'
import Header from '@/app/structures/header'
import Footer from '@/app/structures/footer'
// import Analytic from '@/app/homepages/analytics'
import { useEffect } from 'react'
import Content from './content'
import ContentAuth from './contentAuth'
import { useAccount } from 'wagmi'

export default function Home() {

  useEffect(() => {
    document.title = "Transaction - " + process.env.NEXT_PUBLIC_APPS_NAME;
  }, [])

  const { isConnected, address } = useAccount();
  return (
   <>
    <Header menu={'transaction'}/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" ></link>
        <main className="main--area">
            {
              isConnected ? <ContentAuth/> : <Content/>
            }

        </main>
    <Footer/>
   </>
  )
}
