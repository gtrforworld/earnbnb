import axios from "axios"
import { useEffect, useState } from "react"
import RefLink from "@/app/components/refLink"
import AccountRow from "@/app/components/accountRow"
import { useAccount, useDisconnect } from 'wagmi'
import utcTimeFormat from '@/app/services/utcTimeDate';

export default function content () {
    const { isConnected, address } = useAccount();

    return (
        <>
            <section className="tournament__list-area section-pb-120 section-pt-120" style={{backgroundImage: "url('img/bg/slider_bg.jpg')"}}>
                <div className="container">
                  
                    <div className="tournament__wrapper">

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
                                        </tr>
                                    </thead>
                                    <tbody className="tbody-light">
                                        <tr>
                                            <td>Tier 1</td>
                                            <td>7%</td>
                                        </tr>
                                        <tr>
                                            <td>Tier 2</td>
                                            <td>2%</td>
                                        </tr>
                                        <tr>
                                            <td>Tier 3</td>
                                            <td>1%</td>
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
                    </div>
                </div>
            </section>
        </>
    )
}