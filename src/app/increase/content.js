import axios from "axios"
import { useEffect, useState } from "react"
import IconBtc from "@/app/assets/img/icons/btc.png"
import IconBnb from "@/app/assets/img/icons/bnb.png"
import IconEth from "@/app/assets/img/icons/eth.png"
import IconTrx from "@/app/assets/img/icons/trx.png"
import IconDoge from "@/app/assets/img/icons/doge.png"
import IconUsdt from "@/app/assets/img/icons/usdt.png"
import Image from "next/image"

export default function content () {
    const [statusData, setStatusData] = useState(false);

    const [planData, setPlanData] = useState([]);
   
    useEffect(() => {
        var fetchPlanData = async() => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
                const response = axios.get(apiUrl + '/level').then((response) => {
                    setPlanData(response.data.message);
                    setStatusData(true);
                });
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setStatusData(false);
                return null;
            }
        }

        fetchPlanData();
    }, []);
    
    return (
        <>
             <section className="tournament__list-area section-pb-120 section-pt-120" style={{backgroundImage: "url('img/bg/slider_bg.jpg')", height: "100vh", margin: 0}}>
                <div className="container">
                    <div className="tournament__wrapper" style={{height: "500px"}}>
                        <div className="row align-items-end mb-60">
                            <div className="col-lg-8">
                                <div className="section__title text-center text-lg-start title-shape-none">
                                    <span className="sub-title tg__animate-text ready stop">Increase Your Contribution</span>
                                    <h3 className="title">Wallet Method</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="tournament__list-item-wrapper">
                                    <div className="col-lg-4">
                                        <a href="increase/bitcoin">
                                            <div className="blog__avatar-wrap mb-4 dashcon deposit">
                                                <div className="blog__avatar-info">
                                                    <h4 className="name text-center" style={{marginBottom: "0.5rem"}}>
                                                        <Image style={{marginBottom: "0.5rem"}} src={IconBtc} width={60} height={60}/> <br/>
                                                        <a href="#" className="mt-4">&nbsp;Bitcoin (BEP20)</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-lg-4">
                                        <a href="increase/ethereum">
                                            <div className="blog__avatar-wrap mb-4 dashcon deposit">
                                                <div className="blog__avatar-info">
                                                    <h4 className="name text-center" style={{marginBottom: "0.5rem"}}>
                                                        <Image style={{marginBottom: "0.5rem"}} src={IconEth} width={60} height={60}/> <br/>
                                                        <a href="#" className="mt-4">&nbsp;Ethereum</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-lg-4">
                                        <a href="increase/bnb">
                                            <div className="blog__avatar-wrap mb-4 dashcon deposit">
                                                <div className="blog__avatar-info">
                                                    <h4 className="name text-center" style={{marginBottom: "0.5rem"}}>
                                                        <Image style={{marginBottom: "0.5rem"}} src={IconBnb} width={60} height={60}/> <br/>
                                                        <a href="#" className="mt-4">&nbsp;BNB</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-50">
                                <div className="tournament__list-item-wrapper">
                                    <div className="col-lg-4">
                                        <a href="increase/tron">
                                            <div className="blog__avatar-wrap mb-4 dashcon deposit">
                                                <div className="blog__avatar-info">
                                                    <h4 className="name text-center" style={{marginBottom: "0.5rem"}}>
                                                        <Image style={{marginBottom: "0.5rem"}} src={IconTrx} width={60} height={60}/> <br/>
                                                        <a href="#" className="mt-4">&nbsp;Tron</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-lg-4">
                                        <a href="increase/doge">
                                            <div className="blog__avatar-wrap mb-4 dashcon deposit">
                                                <div className="blog__avatar-info">
                                                    <h4 className="name text-center" style={{marginBottom: "0.5rem"}}>
                                                        <Image style={{marginBottom: "0.5rem"}} src={IconDoge} width={60} height={60}/> <br/>
                                                        <a href="#" className="mt-4">&nbsp;Doge (BEP20)</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-lg-4">
                                        <a href="increase/usdt">
                                            <div className="blog__avatar-wrap mb-4 dashcon deposit">
                                                <div className="blog__avatar-info">
                                                    <h4 className="name text-center" style={{marginBottom: "0.5rem"}}>
                                                        <Image style={{marginBottom: "0.5rem"}} src={IconUsdt} width={60} height={60}/> <br/>
                                                        <a href="#" className="mt-4">&nbsp;USDT (BEP20)</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}