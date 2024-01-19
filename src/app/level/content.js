import axios from "axios"
import { useEffect, useState } from "react"
import IconLevel from "@/app/assets/img/icons/trophy.png"
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
            <section className="tournament__list-area section-pb-120 section-pt-120" style={{backgroundImage: "url('img/bg/slider_bg.jpg')"}}>
                <div className="container">
                    <div className="tournament__wrapper">
                        <div className="row align-items-end mb-60">
                            <div className="col-lg-8">
                                <div className="section__title text-center text-lg-start title-shape-none">
                                    <span className="sub-title tg__animate-text ready stop">INCOME LEVEL UPGRADE</span>
                                    <h3 className="title">Active Plan</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="tournament__list-item-wrapper">
                                    

                                    { 
                                        statusData && (
                                            planData.map(item => (
                                                    <div key={item.d} className="tournament__list-item wow fadeInUp" data-wow-delay=".2s" style={{visibility: "visible", animationDelay: "0.2s", animationName: "fadeInUp"}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1116.562" height="163.37" viewBox="0 0 1116.562 163.37">
                                                            <path className="background-path" d="M708,1784l28-27s4.11-5.76,18-6,702-1,702-1a37.989,37.989,0,0,1,16,9c7.47,7.08,37,33,37,33s9.02,9.47,9,18,0,42,0,42-0.19,9.43-11,19-32,30-32,30-5.53,11.76-21,12-985,0-985,0a42.511,42.511,0,0,1-26-13c-11.433-12.14-34-32-34-32s-6.29-5.01-7-17,0-43,0-43-1-5.42,12-18,34-32,34-32,10.4-8.28,19-8,76,0,76,0a44.661,44.661,0,0,1,21,11c9.268,8.95,22,22,22,22Z" transform="translate(-401.563 -1749.875)"></path>
                                                        </svg>
                                                        <div className="tournament__list-content">
                                                            <div className="tournament__list-thumb">
                                                                <div className="about__funFact-trophy level">
                                                                    <div className="icon"><Image src={IconLevel} alt="trophy" width={50} height={50}/></div>
                                                                </div>
                                                            </div>
                                                            <div className="tournament__list-name">
                                                                <h5 className="team-name">Level <span className="levelNo">{item.level}</span></h5>
                                                            </div>
                                                            <div className="tournament__list-prize">
                                                                <h6 className="title">Income Per Day</h6>
                                                                <span>+{item.c}%</span>
                                                            </div>
                                                            <div className="tournament__list-prize">
                                                                <h6 className="title">Total Deposit</h6>
                                                                <span className="depplan">${item.d} &nbsp;
                                                                <span className="orplan">/</span>
                                                                <br/>
                                                                 {item.b.toFixed(2)}<span className="limitplan">BNB</span></span>
                                                            </div>
                                                            <div className="tournament__list-prize">
                                                                <h6 className="title">Withdrawal <br/>Limit</h6>
                                                                <span>{item.ld.toFixed(2)}</span><span className="limitplan">BNB</span>
                                                            </div>
                                                        
                                                        </div>
                                                    </div>
                                            ))
                                        )
                                    }

                                    { 
                                        !statusData && (
                                            Array.from({ length: 5 }, (_, index) => (
                                                    <div key={index} className="tournament__list-item wow fadeInUp skeleton" data-wow-delay=".2s" style={{visibility: "visible", animationDelay: "0.2s", animationName: "fadeInUp"}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1116.562" height="163.37" viewBox="0 0 1116.562 163.37">
                                                            <path className="background-path" d="M708,1784l28-27s4.11-5.76,18-6,702-1,702-1a37.989,37.989,0,0,1,16,9c7.47,7.08,37,33,37,33s9.02,9.47,9,18,0,42,0,42-0.19,9.43-11,19-32,30-32,30-5.53,11.76-21,12-985,0-985,0a42.511,42.511,0,0,1-26-13c-11.433-12.14-34-32-34-32s-6.29-5.01-7-17,0-43,0-43-1-5.42,12-18,34-32,34-32,10.4-8.28,19-8,76,0,76,0a44.661,44.661,0,0,1,21,11c9.268,8.95,22,22,22,22Z" transform="translate(-401.563 -1749.875)"></path>
                                                        </svg>
                                                        <div className="tournament__list-content">
                                                            <div className="tournament__list-thumb">
                                                                <div className="about__funFact-trophy level">
                                                                    <div className="icon"><Image src={IconLevel} alt="trophy" width={50} height={50}/></div>
                                                                </div>
                                                            </div>
                                                            <div className="tournament__list-name">
                                                                <h5 className="team-name">Level <span className="levelNo"></span></h5>
                                                            </div>
                                                            <div className="tournament__list-prize">
                                                                <h6 className="title">Income Per Day</h6>
                                                                <span>0%</span>
                                                            </div>
                                                            <div className="tournament__list-prize">
                                                                <h6 className="title">Total Deposit</h6>
                                                                <span>$0</span>
                                                            </div>
                                                        
                                                        </div>
                                                    </div>
                                            ))
                                        )
                                    }
                                   

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}