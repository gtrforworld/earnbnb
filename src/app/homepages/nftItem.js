import Image from "next/image"
import IconNft01 from "@/app/assets/img/others/join.png"
import IconNft02 from "@/app/assets/img/others/dailyrate.png"
import IconNft03 from "@/app/assets/img/others/smart.png"
import IconNft04 from "@/app/assets/img/others/breadcrumb_img03.png"

export default function NftItem () {
    return (
        <>
        <section className="nft-item__area">
            <div className="section__title text-center mb-60">
                <h3 className="title">How To Earn?</h3>
                <span className="sub-title tg__animate-text ready stop">We have three earning options for you to choose from: </span>
            </div>
            <div className="container custom-container">
                <div className="row justify-content-center">
                    <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-9">
                        <div className="nft-item__box">
                            <div className="nft-item__thumb">
                                <a href="#"><Image src={IconNft01} height={170} width={200} alt="img"/></a>
                            </div>
                            <div className="nft-item__content">
                                <h4 className="title"><a href="#">Sign Up & Referrals</a></h4>
                                <div className="nft-item__avatar">
                                    <div className="avatar-name">
                                        <span className="designation">Claim up to 0.01 BNB or $3 /user when you sign up or refer a friend!</span>
                                    </div>
                                </div>
                                <div className="nft-item__bid">
                                    <div className="nft-item__price">
                                        <p>7+2+1 <span className="currency">%</span></p>
                                        <a href="#" className="bid-btn">Commission </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-9">
                        <div className="nft-item__box">
                            <div className="nft-item__thumb">
                                <a href="#"><Image src={IconNft02} height={170} width={200} alt="img"/></a>
                            </div>
                            <div className="nft-item__content">
                                <h4 className="title"><a href="#">Daily Rate</a></h4>
                                <div className="nft-item__avatar">
                                    <div className="avatar-name">
                                        <span className="designation">Receive a bonus of 25% of the amount topped up to your account every day! <br/>&nbsp;</span>
                                    </div>
                                </div>
                                <div className="nft-item__bid">
                                    <div className="nft-item__price">
                                        <p>+20 <span className="currency">%</span></p>
                                        <a href="#" className="bid-btn">Deposit </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-9">
                        <div className="nft-item__box">
                            <div className="nft-item__thumb">
                                <a href="#"><Image src={IconNft03} height={170} width={200} alt="img"/></a>
                            </div>
                            <div className="nft-item__content">
                                <h4 className="title"><a href="#">Smart Investment</a></h4>
                                <div className="nft-item__avatar">
                                    <div className="avatar-name">
                                        <span className="designation">Smart investment helps you maximize your income! The more you invest the more you will earn!</span>
                                    </div>
                                </div>
                                <div className="nft-item__bid">
                                    <div className="nft-item__price">
                                        <p>Min: 0.1 <span className="currency">BNB</span></p>
                                        <a href="#" className="bid-btn">Earn 100%</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-9">
                        <div className="nft-item__box">
                            <div className="nft-item__thumb">
                                <a href="#"><Image src={IconNft04} height={170} width={200} alt="img"/></a>
                            </div>
                            <div className="nft-item__content">
                                <h4 className="title"><a href="#">Win Lottery</a></h4>
                                <div className="nft-item__avatar">
                                    <div className="avatar-name">
                                        <span className="designation">Whenever you signup and invite someone, you will get a lottery chance per month of up to $1000!</span>
                                    </div>
                                </div>
                                <div className="nft-item__bid">
                                    <div className="nft-item__price">
                                        <p><span className="currency">$</span> 1000</p>
                                        <a href="#" className="bid-btn">Lottery</a>
                                    </div>
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