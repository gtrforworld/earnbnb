"use client"

import Image from 'next/image'
import Script from 'next/script'
import Header from '@/app/structures/header'
import Footer from '@/app/structures/footer'
import SliderArea from '@/app/homepages/sliderArea'
import HowToEarn from '@/app/homepages/nftItem'
import TopTrending from '@/app/homepages/topTrending'
import JoinCommunity from '@/app/homepages/sectionResult'
// import Analytic from '@/app/homepages/analytics'
import { useEffect } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import AidropModal from './modal.js';
import { useState } from 'react';


export default function Home({ params }) {
  const router = useRouter();

  useEffect(() => {
    document.title = process.env.NEXT_PUBLIC_APPS_NAME;
  }, [])

    const searchParams = useSearchParams()
    const refID = searchParams.get('ref')

    const { isConnected, address } = useAccount({
        onConnect: (isReconnected) => {
            console.log("isConnected", isConnected)
            if(refID) {
              router.push('/dashboard?ref=' + refID);
            }
            else{
              router.push('/dashboard');
            }
        },
        onDisconnect: () => {
            router.push('/');
        }
    });
    const { disconnect } = useDisconnect()

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        openModal();
    }, [])

  return (
   <>
     {showModal && (
            <AidropModal imageUrl="path/to/big-image.jpg" onClose={closeModal} />
        )}

    <Header menu={'home'}/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" ></link>
        <main className="main--area">
          <SliderArea/>
          <JoinCommunity/>
          <HowToEarn/>
          <TopTrending/>
        </main>

    <Footer/>
   </>
  )
}
