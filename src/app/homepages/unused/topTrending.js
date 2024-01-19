import Image from "next/image"
import IconFire from "@/app/assets/img/icons/fire.png"
import IconNFT01 from "@/app/assets/img/nft/nft_avatar01.png"
import IconNFT04 from "@/app/assets/img/nft/nft_img04.jpg"

export default function topTrending () {
    return (
        <>
             <section className="trendingNft-area section-pt-120 section-pb-90">
                <div className="container">
                    <div className="trendingNft__title-wrap">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="trendingNft__title">
                                    <h2 className="title">top Trending <Image src={IconFire} width="35" alt="icon"/></h2>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="trendingNft__nav">
                                    <button className="slider-button-prev"><i className="fas fa-angle-left"></i></button>
                                    <button className="slider-button-next"><i className="fas fa-angle-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-container trendingNft-active">
                        <div className="swiper-wrapper">
                          
                           <div className="swiper-slide">
                                <div className="trendingNft__item">
                                    <div className="trendingNft__item-top">
                                        <div className="trendingNft__item-avatar">
                                            <div className="image">
                                                <a href="shop-details.html"><Image src={IconNFT01} alt="img"/></a>
                                            </div>
                                            <div className="info">
                                                <h6 className="name">Crypto Max</h6>
                                                <a href="shop-details.html" className="userName">@Jon Max</a>
                                            </div>
                                        </div>
                                        <div className="trendingNft__item-wish">
                                            <a href="#"><i className="far fa-heart"></i></a>
                                        </div>
                                    </div>
                                    <div className="trendingNft__item-image">
                                        <a href="shop-details.html"><Image src={IconNFT04} alt="img"/></a>
                                    </div>
                                    <div className="trendingNft__item-bottom">
                                        <div className="trendingNft__item-price">
                                            <span className="bid">Last Bid</span>
                                            <h6 className="eth"><i className="fab fa-ethereum"></i> 1.002 <span>Eth</span></h6>
                                        </div>
                                        <a href="shop-details.html" className="bid-btn">Bid <i className="fas fa-long-arrow-alt-right"></i></a>
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