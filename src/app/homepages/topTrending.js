import Image from "next/image"
import IconFire from "@/app/assets/img/icons/fire.png"
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'
import utcTimeFormat from '@/app/services/utcTimeDate';
import truncateString from '@/app/services/truncateText';

export default function aboutArea() {
    const [tabPane, setTabPane] = useState(1)

    const [statusReady, setStatusReady] = useState(false);
    const [withdrawData, setWithdrawData] = useState([]);
    const [depositData, setDepositData] = useState([]);

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    useEffect(() => {
        var fetchUserInformation = async() => {
            try {
                axios.get(apiEndpoint + '/withdrawal').then((response) => {
                    if(response.data.success) {
                        setStatusReady(true);
                        setWithdrawData(response.data.message)
                    }
                });

                axios.get(apiEndpoint + '/deposit').then((response) => {
                    if(response.data.success) {
                        setStatusReady(true);
                        setDepositData(response.data.message)
                    }
                });
            } catch (error) {
                setStatusReady(false);
                console.error('Error fetching data:', error.message);
                return null;
            }
        }
        
        fetchUserInformation();
    }, [])
    return (
        <>
             <section className="trendingNft-area section-pt-130 section-pb-130">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-10">
                            <div className="section__title text-center mb-60">
                                {/* <span className="sub-title">know about us</span> */}
                                <h3 className="title">Top Trending  <Image src={IconFire} width="35" alt="icon"/></h3>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="about__tab-wrap">
                                <div className="about__buttons">
                                    <a onClick={() => setTabPane(1)} className={tabPane === 1 ? "tg-btn-2 -secondary active" : "tg-btn-2 -secondary"}>Deposit</a>
                                    <a onClick={() => setTabPane(2)} className={tabPane === 2 ? "tg-btn-2 -secondary active" : "tg-btn-2 -secondary"}>Withdrawal</a>
                                </div>
                                {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                                </ul> */}
                            </div>
                        </div>
                    </div>
                    <div className="tab-content" id="myTabContent">
                        
                        <div className={tabPane === 1 ? "tab-pane show active" : "tab-pane"} id="about01" role="tabpanel" aria-labelledby="about01-tab">
                            <div className="justify-content-center">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Address</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody-light">
                                        {
                                            statusReady && (
                                                depositData.map((withdraw, index) => (
                                                    <tr key={index}>
                                                        <td>{truncateString(withdraw.a, 27)}</td>
                                                        <td>{withdraw.b} BNB</td>
                                                        <td>{utcTimeFormat(withdraw.c)}</td>
                                                    </tr>
                                                ))
                                            )
                                        }

                                        {
                                            !statusReady && (
                                                <>
                                                    <tr className="skeleton"><td colSpan={3}>&nbsp;</td></tr>
                                                    <tr className="skeleton"><td colSpan={3}>&nbsp;</td></tr>
                                                    <tr className="skeleton"><td colSpan={3}>&nbsp;</td></tr>
                                                </>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={tabPane === 2 ? "tab-pane show active" : "tab-pane"} id="about01" role="tabpanel" aria-labelledby="about01-tab">
                            <div className="justify-content-center">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Address</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody-light">
                                        {
                                            statusReady && (
                                                withdrawData.map((withdraw, index) => (
                                                    <tr key={index}>
                                                        <td>{truncateString(withdraw.a, 27)}</td>
                                                        <td>{withdraw.b} BNB</td>
                                                        <td>{utcTimeFormat(withdraw.c)}</td>
                                                    </tr>
                                                ))
                                            )
                                        }

                                        {
                                            !statusReady && (
                                                <>
                                                    <tr className="skeleton"><td colSpan={3}>&nbsp;</td></tr>
                                                    <tr className="skeleton"><td colSpan={3}>&nbsp;</td></tr>
                                                    <tr className="skeleton"><td colSpan={3}>&nbsp;</td></tr>
                                                </>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                     
                    </div>
                </div>
            </section>
        </>
    )
}