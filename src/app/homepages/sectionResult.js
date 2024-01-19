"use client"

import Image from "next/image"
import IconBg from "@/app/assets/img/bg/result_bg.png"
import IconSignUp from "@/app/assets/img/others/sign.png"
import IconUser from "@/app/assets/img/others/ref.png"
import IconWinShape from "@/app/assets/img/icons/win_shape.svg"
import IconShape from "@/app/assets/img/icons/shape.svg"
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function matchResult() {
    return (
        <>
             <section className="match__result-area">
                <div className="match__result-bg" style={{backgroundImage: "url('/img/bg/slider_bg.jpg')"}}></div>
                <div className="container">
                    <div className="row justify-content-center" style={{marginTop: "1rem"}}>
                        <div className="col-xl-6 col-lg-7 col-md-10">
                            <div className="section__title text-center mb-55">
                                <span className="sub-title">JOIN COMMUNITY EARNINGS</span>
                                <h3 className="title">EARN REWARD & WIN BNB</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="match__winner-title">Registration Bonus</h4>
                        </div>
                    </div>
                    <div className="row match__result-wrapper justify-content-center">
                        <div className="col-xl-5 col-sm-6">
                            <div className="match__winner-wrap">
                                <div className="match__winner-info">
                                    <h4 className="name">SIGN UP</h4>
                                    <span className="price-amount">0.01 BNB / $3.00</span>
                                </div>
                                <div className="match__winner-img">
                                    <div className="team-logo-img">
                                        <a href="team-details.html"><Image src={IconSignUp} width={60} alt="img"/></a>
                                    </div>
                                    <div className="svg-icon" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 135 75">
                                            <path id="rectangle" className="cls-1" d="M924,1194H809v75H924s20-37.5,20-37.63C944,1231.5,924,1194,924,1194Z" transform="translate(-809 -1194)" 
                                                style={{strokeDasharray: 391, strokeDashoffset: 0}}>
                                            </path>
                                        </svg>
                                    </div>
                                    <h3 className="match__winner-place">win</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-sm-6">
                            <div className="match__winner-wrap">
                                <div className="match__winner-info">
                                    <h4 className="name">REFERRAL</h4>
                                    <span className="price-amount">0.01 BNB / $3</span>
                                </div>
                                <div className="match__winner-img">
                                    <div className="team-logo-img">
                                        <a href="team-details.html"><Image src={IconUser} width={100} height={90} alt="img"/></a>
                                    </div>
                                    <div className="svg-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 135 75">
                                        <path id="rectangle" className="cls-1" d="M924,1194H809v75H924s20-37.5,20-37.63C944,1231.5,924,1194,924,1194Z" 
                                        transform="translate(-809 -1194)" 
                                        style={{strokeDasharray: 391, strokeDashoffset: 0}}>
                                        </path>
                                        </svg>
                                    </div>
                                    <h3 className="match__winner-place">2nd</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="grand__final">
                                <h3 className="grand__final-date">Total Bonus</h3>
                                <span className="grand__final-place">0.02 BNB / $6</span>
                                <div className="grand__final-button">
                                <ConnectButton.Custom>
                                    {({
                                        account,
                                        chain,
                                        openAccountModal,
                                        openChainModal,
                                        openConnectModal,
                                        authenticationStatus,
                                        mounted,
                                    }) => {
                                        // Note: If your app doesn't use authentication, you
                                        // can remove all 'authenticationStatus' checks
                                        const ready = mounted && authenticationStatus !== 'loading';
                                        const connected =
                                        ready &&
                                        account &&
                                        chain &&
                                        (!authenticationStatus ||
                                            authenticationStatus === 'authenticated');

                                        return (
                                        <div
                                            {...(!ready && {
                                            'aria-hidden': true,
                                            'style': {
                                                opacity: 0,
                                                pointerEvents: 'none',
                                                userSelect: 'none',
                                            },
                                            })}
                                        >
                                            {(() => {
                                            if (!connected) {
                                                return (
                                                    <a href="#" onClick={openConnectModal}  className="tg-btn-3 mx-auto">
                                                        <div className="svg-icon" >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 188 61">
                                                            <path className="cls-1" d="M874,554.154L893.08,524h146.67L1060,552.843,1039.75,583H893.08Z" transform="translate(-873 -523)" 
                                                                style={{strokeDasharray: 436, strokeDashoffset: 0}}
                                                            ></path>
                                                            </svg>
                                                        </div>
                                                        <span>Register Now</span>
                                                    </a>
                                                );
                                            }

                                            if (chain.unsupported) {
                                                return (
                                                <button onClick={openChainModal} type="button">
                                                    Wrong network
                                                </button>
                                                );
                                            }

                                            return (
                                                <></>
                                            );
                                            })()}
                                        </div>
                                        );
                                    }}
                                    </ConnectButton.Custom>
                                    {/* <a href="#" className="tg-btn-3 mx-auto">
                                        <div className="svg-icon" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 188 61">
                                            <path className="cls-1" d="M874,554.154L893.08,524h146.67L1060,552.843,1039.75,583H893.08Z" transform="translate(-873 -523)" 
                                                style={{strokeDasharray: 436, strokeDashoffset: 0}}
                                            ></path>
                                            </svg>
                                        </div>
                                        <span>Register Now</span>
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}