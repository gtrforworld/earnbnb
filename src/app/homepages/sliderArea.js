import Image from "next/image"
import IconShape01 from "@/app/assets/img/slider/slider_shape01.png"
import IconShape02 from "@/app/assets/img/slider/slider_shape02.png"
import IconShape03 from "@/app/assets/img/slider/slider_shape03.png"
import IconShape04 from "@/app/assets/img/slider/slider_shape04.png"
import IconTrophy from "@/app/assets/img/others/breadcrumb_img02.png"
import axios from "axios";
import { useEffect, useState } from "react";

export default function sliderArea () {
    const [statusData, setStatusData] = useState(false);

    const [statisticData, setStatisticData] = useState([]);
   
    useEffect(() => {
        var fetchPlanData = async() => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
                axios.get(apiUrl + '/statistics').then((response) => {
                    setStatisticData(response.data.message);
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
             <section className="slider__area slider__bg" style={{backgroundImage: "url('/img/bg/surf.png')"}}>
              <div className="slider-activee">
                  <div className="single-slider">
                      <div className="container custom-container">
                          <div className="row justify-content-between">
                              <div className="col-lg-12">
                                  <div className="slider__img text-center" style={{height: "800px", backgroundSize: "contain"}}>
                                       
                                    <div className="slider__brand-wrap">
                                        <div className="container custom-container">
                                            <div className="tournament__list-item-wrapper">
                                                <div className="tournament__list-item wow fadeInUp" style={{visibility: "visible", animationName: "fadeInUp", animationDelay: "0.2s"}} data-wow-delay=".2s">
                                                    <svg xmlns="http://www.w3.org/2000/svg" widths={1116.562} height={163.37}  viewBox="0 0 1116.562 163.37">
                                                        <path className="background-path" d="M708,1784l28-27s4.11-5.76,18-6,702-1,702-1a37.989,37.989,0,0,1,16,9c7.47,7.08,37,33,37,33s9.02,9.47,9,18,0,42,0,42-0.19,9.43-11,19-32,30-32,30-5.53,11.76-21,12-985,0-985,0a42.511,42.511,0,0,1-26-13c-11.433-12.14-34-32-34-32s-6.29-5.01-7-17,0-43,0-43-1-5.42,12-18,34-32,34-32,10.4-8.28,19-8,76,0,76,0a44.661,44.661,0,0,1,21,11c9.268,8.95,22,22,22,22Z" transform="translate(-401.563 -1749.875)"></path>
                                                    </svg>
                                                    <div className="tournament__list-content">
                                                        <div className="tournament__list-thumb">
                                                            <a href="/level"> <Image src={IconTrophy} width={100.562} height={163.37} alt="Logo"/></a>
                                                        </div>
                                                        <div className="tournament__list-prize">
                                                            <h6 className="title">People</h6>
                                                            <span>
                                                                {
                                                                    statusData ? (
                                                                        statisticData.people
                                                                    ) : (
                                                                        0
                                                                    )
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="tournament__list-prize">
                                                            <h6 className="title">BNB Pool</h6>
                                                            <span>
                                                                {
                                                                    statusData ? (
                                                                        <>
                                                                            {statisticData.deposit.toFixed(4)} <span className="limitplan">BNB</span>
                                                                        </>
                                                                    ) : (
                                                                        0
                                                                    )
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="tournament__list-prize">
                                                            <h6 className="title">Withdrawal</h6>
                                                            <span>
                                                                {
                                                                    statusData ? (
                                                                        <>
                                                                            {statisticData.withdraw.toFixed(4)} <span className="limitplan">BNB</span>
                                                                        </>
                                                                    ) : (
                                                                        0
                                                                    )
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="tournament__list-prize">
                                                            <h6 className="title">Lottery</h6>
                                                            <span>
                                                                {
                                                                    statusData ? (
                                                                        <>
                                                                            {statisticData.lottery.toFixed(4)} <span className="limitplan">BNB</span>
                                                                        </>
                                                                    ) : (
                                                                        0
                                                                    )
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="slider__shapes">
                  <Image src={IconShape01} alt="shape"/>
                  <Image src={IconShape02} alt="shape"/>
                  <Image src={IconShape03} alt="shape"/>
                  <Image src={IconShape04} alt="shape"/>
              </div>
          </section>
        </>
    )
}