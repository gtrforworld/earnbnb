"use client"

import Image from 'next/image'
import Script from 'next/script'
import Header from '@/app/structures/header'
import Footer from '@/app/structures/footer'
// import Analytic from '@/app/homepages/analytics'
import { useEffect } from 'react'
import IconBtc from "@/app/assets/img/icons/btc.png"
import IconBnb from "@/app/assets/img/icons/bnb.png"
import IconEth from "@/app/assets/img/icons/eth.png"
import IconTrx from "@/app/assets/img/icons/trx.png"
import IconDoge from "@/app/assets/img/icons/doge.png"
import IconUsdt from "@/app/assets/img/icons/usdt.png"
import { useQRCode } from 'next-qrcode';

export default function Home() {

  useEffect(() => {
    document.title = "USDT - " + process.env.NEXT_PUBLIC_APPS_NAME;
  }, [])

  const { Canvas } = useQRCode();

  var toAddress = "0xEE2B1801800DEA732eB67e5236913D1D0d287228";
  return (
   <>
    <Header menu={'home'}/>
        <main className="main--area">
            <section className="tournament__list-area section-pb-120 section-pt-120" style={{backgroundImage: "url('/img/bg/slider_bg.jpg')", height: "100vh", margin: 0}}>
                <div className="container">
                    <div className="tournament__wrapper mt-5">

                        <div className="row align-items-end mb-20">
                            <div className="col-lg-12">
                                <div className="blog-post-wrapper" style={{width: '100%'}} >
                                    <div className="tournament__details-content">
                                        <h2 className="title">
                                            <Image style={{marginBottom: "0.5rem"}} src={IconUsdt} width={60} height={60}/>
                                            &nbsp; Instructions
                                        </h2>
                                        <blockquote className="blockquoteclass"><p>Send an amount (USDT BEP20) to the address:</p></blockquote>
                                        <p>
                                            Your transaction has completed (It has at least 2 network confirmation).
                                            <br/> Your deposit automatically converted to BNB Amount.
                                        </p>
                                        <p>
                                            Min. amount: <span className="instructionPercent">10 USDT</span>;
                                        </p>
                                        <h4 className="tournament__details-form-title notransform">{toAddress}</h4>
                                        <Canvas
                                            text={toAddress}
                                            options={{
                                                errorCorrectionLevel: 'M',
                                                margin: 3,
                                                scale: 4,
                                                width: 200,
                                                color: {
                                                // dark: '#010599FF',
                                                // light: '#FFBF60FF',
                                                },
                                            }}
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    <Footer/>
   </>
  )
}
