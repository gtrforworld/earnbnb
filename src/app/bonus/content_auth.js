import axios from "axios"
import { useEffect, useState } from "react"
import AccountRow from "@/app/components/accountRow"
import { useAccount, useDisconnect } from 'wagmi'
import { differenceInSeconds } from 'date-fns';
import CountdownTimer from '@/app/services/countDown';
import { showToast } from '@/app/services/showToast'
import utcTimeFormat from '@/app/services/utcTimeDate';
import truncateString from '@/app/services/truncateText';

export default function content () {
    const { isConnected, address } = useAccount({
        onConnect: (isReconnected) => {
            console.log("isConnected", isConnected)
        },
        onDisconnect: () => {

        }
    });
    const { disconnect } = useDisconnect()

    // daily bonus 
    const [statusDaily, setStatusDaily] = useState(false);
    const [diffSecDaily, setDiffSecDaily] = useState(0);
    const [bonusOpenDaily, setBonusOpenDaily] = useState(false);
    const [timeNextBonusDaily, setTimeNextBonusDaily] = useState(0);

    const [statusWeek, setStatusWeek] = useState(false);
    const [diffSecWeek, setDiffSecWeek] = useState(0);
    const [bonusOpenWeek, setBonusOpenWeek] = useState(false);
    const [timeNextBonusWeek, setTimeNextBonusWeek] = useState(0);

    const [statusMonth, setStatusMonth] = useState(false);
    const [diffSecMonth, setDiffSecMonth] = useState(0);
    const [bonusOpenMonth, setBonusOpenMonth] = useState(false);
    const [timeNextBonusMonth, setTimeNextBonusMonth] = useState(0);

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    useEffect(() => {
        var fetchUserInformation = async() => {
            try {
                axios.get(apiEndpoint + '/getUser', {
                    params: {
                        address: address
                    }
                }).then((response) => {
                    if(response.data.success) {
                        var nextLotteryTimeDaily = response.data.message[0].db;
                        arrangeDayBonus(nextLotteryTimeDaily);

                        var nextLotteryTimeWeek = response.data.message[0].wb;
                        arrangeWeekBonus(nextLotteryTimeWeek);

                        var nextLotteryTimeMonth = response.data.message[0].mb;
                        arrangeMonthBonus(nextLotteryTimeMonth);
                    }
                });
            } catch (error) {
                setStatusDaily(false);
                console.error('Error fetching data:', error.message);
                return null;
            }
        }
        
        fetchUserInformation();
    }, [])

    var arrangeDayBonus = (nextLotteryTimeDaily) => {
        setTimeNextBonusDaily(nextLotteryTimeDaily);
        const date1 = new Date(nextLotteryTimeDaily);
        const currentDate = new Date();
        const timeRemaining = differenceInSeconds(date1, currentDate);
        setDiffSecDaily(timeRemaining);
        if(timeRemaining > 0) {
            setBonusOpenDaily(false);
        }
        else{
            setBonusOpenDaily(true);
        }
        setStatusDaily(true);
    }

    var arrangeWeekBonus = (nextLotteryTimeWeekly) => {
        setTimeNextBonusWeek(nextLotteryTimeWeekly);
        const date1 = new Date(nextLotteryTimeWeekly);
        const currentDate = new Date();
        const timeRemaining = differenceInSeconds(date1, currentDate);
        setDiffSecWeek(timeRemaining);
        if(timeRemaining > 0) {
            setBonusOpenWeek(false);
        }
        else{
            setBonusOpenWeek(true);
        }
        setStatusWeek(true);
    }

    var arrangeMonthBonus = (nextLotteryTimeMonthly) => {
        setTimeNextBonusMonth(nextLotteryTimeMonthly);
        const date1 = new Date(nextLotteryTimeMonthly);
        const currentDate = new Date();
        const timeRemaining = differenceInSeconds(date1, currentDate);
        setDiffSecMonth(timeRemaining);
        if(timeRemaining > 0) {
            setBonusOpenMonth(false);
        }
        else{
            setBonusOpenMonth(true);
        }
        setStatusMonth(true);
    }



    // open bonus 
    const [submitBtnDaily, setSubmitBtnDaily] = useState(false);
    var claimDailyBonus = async() => {
        setSubmitBtnDaily(true);
        try {
            const response = await axios.post( `${apiEndpoint}/bonus`,
              { walletAddress: address, type: 'day'}
            );
                
            showToast('Congratulation! You have claimed your daily bonus 0.001!');
            setTimeout(function(){
                setSubmitBtnDaily(false);
                window.location.reload();
            }, 5000);
          } catch (error) {
              // Handle errors
            setSubmitBtnDaily(false);
            console.error('API Error:', error);
            if(error.response) {
                showToast(error.response.data.message, 'error');
            }
            else{
                showToast('Operation failed!', 'error');
            }
        }
    }

    const [submitBtnWeek, setSubmitBtnWeek] = useState(false);
    var claimWeekBonus = async() => {
        setSubmitBtnWeek(true);
        try {
            const response = await axios.post( `${apiEndpoint}/bonus`,
              { walletAddress: address, type: 'week'}
            );
                
            showToast('Congratulation! You have claimed your week bonus 0.005!');
            setTimeout(function(){
                setSubmitBtnWeek(false);
                window.location.reload();
            }, 5000);
          } catch (error) {
              // Handle errors
            setSubmitBtnWeek(false);
            console.error('API Error:', error);
            if(error.response) {
                showToast(error.response.data.message, 'error');
            }
            else{
                showToast('Operation failed!', 'error');
            }
        }
    }

    const [submitBtnMonth, setSubmitBtnMonth] = useState(false);
    var claimMonthBonus = async() => {
        setSubmitBtnMonth(true);
        try {
            const response = await axios.post( `${apiEndpoint}/bonus`,
              { walletAddress: address, type: 'month'}
            );
                
            showToast('Congratulation! You have claimed your Month bonus 0.025!');
            setTimeout(function(){
                setSubmitBtnMonth(false);
                window.location.reload();
            }, 5000);
          } catch (error) {
              // Handle errors
            setSubmitBtnWeek(false);
            console.error('API Error:', error);
            if(error.response) {
                showToast(error.response.data.message, 'error');
            }
            else{
                showToast('Operation failed!', 'error');
            }
        }
    }

    const [historyStatusDaily, setHistoryStatusDaily] = useState(false);
    const [dataHistoryDaily, setDataHistoryDaily] = useState([]);
    const fetchLotteryHistoryDaily = () => {
        try {
            axios.get(apiEndpoint + '/bonus', {
                params: {
                    type: "day"
                }
            }).then((response) => {
                if(response.data.success) {
                    setHistoryStatusDaily(true);
                    setDataHistoryDaily(response.data.message);
                }
            });
        } catch (error) {
            setHistoryStatusDaily(false);
        }
    }

    const [historyStatusWeek, setHistoryStatusWeek] = useState(false);
    const [dataHistoryWeek, setDataHistoryWeek] = useState([]);
    const fetchLotteryHistoryWeek = () => {
        try {
            axios.get(apiEndpoint + '/bonus', {
                params: {
                    type: "week"
                }
            }).then((response) => {
                if(response.data.success) {
                    setHistoryStatusWeek(true);
                    setDataHistoryWeek(response.data.message);
                }
            });
        } catch (error) {
            setHistoryStatusWeek(false);
        }
    }

    const [historyStatusMonth, setHistoryStatusMonth] = useState(false);
    const [dataHistoryMonth, setDataHistoryMonth] = useState([]);
    const fetchLotteryHistoryMonth = () => {
        try {
            axios.get(apiEndpoint + '/bonus', {
                params: {
                    type: "month"
                }
            }).then((response) => {
                if(response.data.success) {
                    setHistoryStatusMonth(true);
                    setDataHistoryMonth(response.data.message);
                }
            });
        } catch (error) {
            setHistoryStatusMonth(false);
        }
    }

    useEffect(() => {
        fetchLotteryHistoryDaily();
        fetchLotteryHistoryWeek();
        fetchLotteryHistoryMonth();
    }, [])

    return (
        <>
            <section className="tournament__list-area section-pb-120 section-pt-120" style={{backgroundImage: "url('img/bg/slider_bg.jpg')"}}>
                <div className="container">
                    <AccountRow/>
                    <div className="tournament__wrapper" style={{marginTop: "5rem"}}>
                        <div className="row align-items-end mb-60">
                            <div className="col-lg-8">
                                <div className="section__title text-center text-lg-start title-shape-none">
                                    <span className="sub-title tg__animate-text ready stop">bonus</span>
                                    <h3 className="title">Earn Bonus</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="tournament__list-item-wrapper">
                                  
                                    <div className="row justify-content-center gutter-25">
                                        <div className="col-lg-4">
                                            <div className="tournament__box-wrap">
                                                <svg className="main-bg" x="0px" y="0px" viewBox="0 0 357 533" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule={"evenodd"} clipRule={"evenodd"} d="M2.00021 63H103C103 63 114.994 62.778 128 50C141.006 37.222 168.042 13.916 176 10C183.958 6.084 193 1.9 213 2C233 2.1 345 1 345 1C347.917 1.66957 350.51 3.33285 352.334 5.70471C354.159 8.07658 355.101 11.0093 355 14C355.093 25.1 356 515 356 515C356 515 357.368 529.61 343 530C328.632 530.39 15.0002 532 15.0002 532C15.0002 532 0.937211 535.85 1.00021 522C1.06321 508.15 2.00021 63 2.00021 63Z" fill="#19222B" stroke="#4C4C4C" strokeWidth={"0.25"}></path>
                                                </svg>
                                                <svg className="price-bg" viewBox="0 0 166 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule={"evenodd"} clipRule={"evenodd"} d="M0.00792892 55V11C0.00792892 11 -0.729072 0.988 12.0079 1C24.7449 1.012 160.008 0 160.008 0C160.008 0 172.491 1.863 161.008 10C148.995 18.512 115.008 48 115.008 48C115.008 48 110.021 55.238 90.0079 55C69.9949 54.762 0.00792892 55 0.00792892 55Z" fill="currentcolor"></path>
                                                </svg>
                                                <div className="tournament__box-price">
                                                    <i className="fas fa-coins"></i>
                                                    <span>0.001 BNB</span>
                                                </div>
                                                <div className="tournament__box-countdown">
                                                    <div className="coming-time">
                                                        {/* <div className="time-count day"><span>00</span>Day</div>
                                                        <div className="time-count hour"><span>00</span>hour</div>
                                                        <div className="time-count min"><span>00</span>min</div>
                                                        <div className="time-count sec"><span>00</span>sec</div> */}
                                                        &nbsp;
                                                    </div>
                                                </div>
                                                <div className="tournament__box-caption">
                                                    <span className="sub">DAILY</span>
                                                    <h4 className="title">BONUS</h4>
                                                </div>
                                                {
                                                    bonusOpenDaily && (
                                                        <div className="tournament__box-prize claimin">
                                                            <i className="fas fa-coins"></i>
                                                            {
                                                                submitBtnDaily && (
                                                                    <span>Processing...</span>
                                                                )
                                                            }
                                                            {
                                                                !submitBtnDaily && (
                                                                    <span onClick={claimDailyBonus}>Claim Now</span>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }

                                                {
                                                    !bonusOpenDaily && (
                                                        <div className="tournament__box-prize">
                                                            <i className="fas fa-coins"></i>
                                                            <span>
                                                                <CountdownTimer targetDate={timeNextBonusDaily} />
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                <ul className="tournament__box-list list-wrap">
                                                    {
                                                        historyStatusDaily && (
                                                            dataHistoryDaily.length > 0 && (
                                                                dataHistoryDaily.map((item, index) => (
                                                                    <li key={index}>
                                                                        <div className="tournament__box-list-item">
                                                                            <h6 className="tournament__player-name">{truncateString(item.ad)}</h6>
                                                                            <span className="tournament__player-price">{utcTimeFormat(item.t)}</span>
                                                                        </div>
                                                                    </li>
                                                                ))
                                                            )
                                                        )
                                                    }
                                                    {
                                                        !historyStatusDaily && (
                                                            <>
                                                                <li>
                                                                    <div className="tournament__box-list-item skeleton">
                                                                        <h6 className="tournament__player-name">&nbsp;</h6>
                                                                        <span className="tournament__player-price">&nbsp;</span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="tournament__box-list-item skeleton">
                                                                        <h6 className="tournament__player-name">&nbsp;</h6>
                                                                        <span className="tournament__player-price">&nbsp;</span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="tournament__box-list-item skeleton">
                                                                        <h6 className="tournament__player-name">&nbsp;</h6>
                                                                        <span className="tournament__player-price">&nbsp;</span>
                                                                    </div>
                                                                </li>
                                                            </>
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="tournament__box-wrap active">
                                                <svg className="main-bg" x="0px" y="0px" viewBox="0 0 357 533" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule={"evenodd"} clipRule={"evenodd"} d="M2.00021 63H103C103 63 114.994 62.778 128 50C141.006 37.222 168.042 13.916 176 10C183.958 6.084 193 1.9 213 2C233 2.1 345 1 345 1C347.917 1.66957 350.51 3.33285 352.334 5.70471C354.159 8.07658 355.101 11.0093 355 14C355.093 25.1 356 515 356 515C356 515 357.368 529.61 343 530C328.632 530.39 15.0002 532 15.0002 532C15.0002 532 0.937211 535.85 1.00021 522C1.06321 508.15 2.00021 63 2.00021 63Z" fill="#19222B" stroke="#4C4C4C" strokeWidth={0.25}></path>
                                                </svg>
                                                <svg className="price-bg" viewBox="0 0 166 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule={"evenodd"} clipRule={"evenodd"} d="M0.00792892 55V11C0.00792892 11 -0.729072 0.988 12.0079 1C24.7449 1.012 160.008 0 160.008 0C160.008 0 172.491 1.863 161.008 10C148.995 18.512 115.008 48 115.008 48C115.008 48 110.021 55.238 90.0079 55C69.9949 54.762 0.00792892 55 0.00792892 55Z" fill="currentcolor"></path>
                                                </svg>
                                                <div className="tournament__box-price">
                                                    <i className="fas fa-coins"></i>
                                                    <span>0.005 BNB</span>
                                                </div>
                                                <div className="tournament__box-countdown">
                                                    <div className="coming-time">
                                                        {/* <div className="time-count day"><span>00</span>Day</div>
                                                        <div className="time-count hour"><span>00</span>hour</div>
                                                        <div className="time-count min"><span>00</span>min</div>
                                                        <div className="time-count sec"><span>00</span>sec</div> */}
                                                        &nbsp;
                                                    </div>
                                                </div>
                                                <div className="tournament__box-caption">
                                                    <span className="sub">WEEKLY</span>
                                                    <h4 className="title">BONUS</h4>
                                                </div>
                                                    {
                                                        bonusOpenWeek && (
                                                            <div className="tournament__box-prize claimin">
                                                                <i className="fas fa-coins"></i>
                                                                {
                                                                    submitBtnWeek && (
                                                                        <span>Processing...</span>
                                                                    )
                                                                }
                                                                {
                                                                    !submitBtnWeek && (
                                                                        <span onClick={claimWeekBonus}>Claim Now</span>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                    }

                                                    {
                                                        !bonusOpenWeek && (
                                                            <div className="tournament__box-prize">
                                                                <i className="fas fa-coins"></i>
                                                                <span>
                                                                    <CountdownTimer targetDate={timeNextBonusWeek} />
                                                                </span>
                                                            </div>
                                                        )
                                                    }
                                                <ul className="tournament__box-list list-wrap">
                                                    {
                                                        historyStatusWeek && (
                                                            dataHistoryWeek.length > 0 && (
                                                                dataHistoryWeek.map((item, index) => (
                                                                    <li key={index}>
                                                                        <div className="tournament__box-list-item">
                                                                            <h6 className="tournament__player-name">{truncateString(item.ad)}</h6>
                                                                            <span className="tournament__player-price">{utcTimeFormat(item.t)}</span>
                                                                        </div>
                                                                    </li>
                                                                ))
                                                            )
                                                        )
                                                    }
                                                    {
                                                        !historyStatusWeek && (
                                                            <>
                                                                <li>
                                                                    <div className="tournament__box-list-item skeleton">
                                                                        <h6 className="tournament__player-name">&nbsp;</h6>
                                                                        <span className="tournament__player-price">&nbsp;</span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="tournament__box-list-item skeleton">
                                                                        <h6 className="tournament__player-name">&nbsp;</h6>
                                                                        <span className="tournament__player-price">&nbsp;</span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="tournament__box-list-item skeleton">
                                                                        <h6 className="tournament__player-name">&nbsp;</h6>
                                                                        <span className="tournament__player-price">&nbsp;</span>
                                                                    </div>
                                                                </li>
                                                            </>
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="tournament__box-wrap">
                                                <svg className="main-bg" x="0px" y="0px" viewBox="0 0 357 533" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule={"evenodd"} clipRule={"evenodd"} d="M2.00021 63H103C103 63 114.994 62.778 128 50C141.006 37.222 168.042 13.916 176 10C183.958 6.084 193 1.9 213 2C233 2.1 345 1 345 1C347.917 1.66957 350.51 3.33285 352.334 5.70471C354.159 8.07658 355.101 11.0093 355 14C355.093 25.1 356 515 356 515C356 515 357.368 529.61 343 530C328.632 530.39 15.0002 532 15.0002 532C15.0002 532 0.937211 535.85 1.00021 522C1.06321 508.15 2.00021 63 2.00021 63Z" fill="#19222B" stroke="#4C4C4C" strokeWidth={"0.25"}></path>
                                                </svg>
                                                <svg className="price-bg" viewBox="0 0 166 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule={"evenodd"} clipRule={"evenodd"} d="M0.00792892 55V11C0.00792892 11 -0.729072 0.988 12.0079 1C24.7449 1.012 160.008 0 160.008 0C160.008 0 172.491 1.863 161.008 10C148.995 18.512 115.008 48 115.008 48C115.008 48 110.021 55.238 90.0079 55C69.9949 54.762 0.00792892 55 0.00792892 55Z" fill="currentcolor"></path>
                                                </svg>
                                                <div className="tournament__box-price">
                                                    <i className="fas fa-coins"></i>
                                                    <span>0.025 BNB</span>
                                                </div>
                                                <div className="tournament__box-countdown">
                                                    <div className="coming-time">
                                                        {/* <div className="time-count day"><span>00</span>Day</div>
                                                        <div className="time-count hour"><span>00</span>hour</div>
                                                        <div className="time-count min"><span>00</span>min</div>
                                                        <div className="time-count sec"><span>00</span>sec</div> */}
                                                        &nbsp;
                                                    </div>
                                                </div>
                                                <div className="tournament__box-caption">
                                                    <span className="sub">MONTHLY</span>
                                                    <h4 className="title">BONUS</h4>
                                                </div>
                                                    {
                                                        bonusOpenMonth && (
                                                            <div className="tournament__box-prize claimin">
                                                                <i className="fas fa-coins"></i>
                                                                {
                                                                    submitBtnMonth && (
                                                                        <span>Processing...</span>
                                                                    )
                                                                }
                                                                {
                                                                    !submitBtnMonth && (
                                                                        <span onClick={claimMonthBonus}>Claim Now</span>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                    }

                                                    {
                                                        !bonusOpenMonth && (
                                                            <div className="tournament__box-prize">
                                                                <i className="fas fa-coins"></i>
                                                                <span>
                                                                    <CountdownTimer targetDate={timeNextBonusMonth} />
                                                                </span>
                                                            </div>
                                                        )
                                                    }
                                                <ul className="tournament__box-list list-wrap">
                                                    {
                                                        historyStatusMonth && (
                                                            dataHistoryMonth.length > 0 && (
                                                                dataHistoryMonth.map((item, index) => (
                                                                    <li key={index}>
                                                                        <div className="tournament__box-list-item">
                                                                            <h6 className="tournament__player-name">{truncateString(item.ad)}</h6>
                                                                            <span className="tournament__player-price">{utcTimeFormat(item.t)}</span>
                                                                        </div>
                                                                    </li>
                                                                ))
                                                            )
                                                        )
                                                    }
                                                    {
                                                        !historyStatusMonth && (
                                                            <>
                                                                <li>
                                                                    <div className="tournament__box-list-item skeleton">
                                                                        <h6 className="tournament__player-name">&nbsp;</h6>
                                                                        <span className="tournament__player-price">&nbsp;</span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="tournament__box-list-item skeleton">
                                                                        <h6 className="tournament__player-name">&nbsp;</h6>
                                                                        <span className="tournament__player-price">&nbsp;</span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="tournament__box-list-item skeleton">
                                                                        <h6 className="tournament__player-name">&nbsp;</h6>
                                                                        <span className="tournament__player-price">&nbsp;</span>
                                                                    </div>
                                                                </li>
                                                            </>
                                                        )
                                                    }
                                                </ul>
                                            </div>
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