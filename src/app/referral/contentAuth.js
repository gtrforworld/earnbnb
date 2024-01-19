import axios from "axios"
import { useEffect, useState } from "react"
import RefLink from "@/app/components/refLink"
import AccountRow from "@/app/components/accountRow"
import { useAccount, useDisconnect } from 'wagmi'
import utcTimeFormat from '@/app/services/utcTimeDate';

export default function content () {
    const { isConnected, address } = useAccount();
    const [level1, setLevel1] = useState(0);
    const [level2, setLevel2] = useState(0);
    const [level3, setLevel3] = useState(0);
    const [refList, setRefList] = useState([]);
    const [statusReady, setStatusReady] = useState(false);

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    useEffect(() => {
        var fetchUserInformation = async() => {
            try {
                axios.get(apiEndpoint + '/getReferral', {
                    params: {
                        address: address
                    }
                }).then((response) => {
                    console.log("response", response)
                    if(response.data.success) {
                        setStatusReady(true);
                        setLevel1(response.data.message.lvl1)
                        setLevel2(response.data.message.lvl2)
                        setLevel3(response.data.message.lvl3)
                        setRefList(response.data.message.ref)
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
            <section className="tournament__list-area section-pb-120 section-pt-120" style={{backgroundImage: "url('img/bg/slider_bg.jpg')"}}>
                <div className="container">
                    <AccountRow/>
                  
                    <div className="tournament__wrapper">


                        <RefLink/>

                        <div className="row align-items-end mb-60">
                            <div className="col-lg-12">
                                <div className="section__title text-center text-lg-start title-shape-none">
                                    <span className="sub-title tg__animate-text ready stop">referral Statistics</span>
                                    {/* <h3 className="title">Active tournament</h3> */}
                                </div>
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Level</th>
                                            <th scope="col">Comission</th>
                                            <th scope="col">Total Referral</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody-light">
                                        <tr>
                                            <td>Tier 1</td>
                                            <td>7%</td>
                                            <td>{level1}</td>
                                        </tr>
                                        <tr>
                                            <td>Tier 2</td>
                                            <td>2%</td>
                                            <td>{level2}</td>
                                        </tr>
                                        <tr>
                                            <td>Tier 3</td>
                                            <td>1%</td>
                                            <td>{level3}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row align-items-end mb-60">
                            <div className="col-lg-12">
                                <div className="blog-post-wrapper" style={{width: '100%'}} >
                                    <div className="tournament__details-content">
                                        <h2 className="title">Instructions</h2>
                                        <blockquote className="blockquoteclass"><p>The Referral (Affiliate) Program Consists Of More Than 1 Level. What Does This Mean?</p></blockquote>
                                        <p>If A Person Uses Your Referral Link To Register, He Becomes Your Referral, And You Will Receive <span className="instructionPercent">7%</span> Of Every Earnings He Makes. This Is A First-Level Or Tier 1 Referral.</p>
                                        <p>The Person He Invites Becomes Your Second-Level Referral And You Will Receive <span className="instructionPercent">2%</span> Comission From This Person’s Earnings.</p>
                                        <p>Similarly, If Your Second-Level Referral Invites A New User, Then This User Becomes Your Third-Level Referral. You Will Receive <span className="instructionPercent">1%</span> Comission From This Person’s Earnings.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-end mb-60">
                            <div className="col-lg-12">
                                <div className="section__title text-center text-lg-start title-shape-none">
                                    <span className="sub-title tg__animate-text ready stop">Your Referral</span>
                                    {/* <h3 className="title">Active tournament</h3> */}
                                </div>
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Address</th>
                                            <th scope="col">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody-light">
                                        {
                                            !statusReady && (
                                                <>
                                                    <tr className="skeleton"><td colSpan={2}>&nbsp;</td></tr>
                                                    <tr className="skeleton"><td colSpan={2}>&nbsp;</td></tr>
                                                    <tr className="skeleton"><td colSpan={2}>&nbsp;</td></tr>
                                                </>
                                            )
                                        }

                                        {
                                            statusReady && (
                                                refList.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.a}</td>
                                                        <td>{utcTimeFormat(item.c)}</td>
                                                    </tr>
                                                ))
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