import axios from "axios"
import { useEffect, useState } from "react"
import AccountRow from "@/app/components/accountRow"
import utcTimeFormat from '@/app/services/utcTimeDate';
import { useAccount } from 'wagmi'
import { showToast } from '@/app/services/showToast'
import truncateString from '@/app/services/truncateText';

export default function content () {
    const { isConnected, address } = useAccount();

    const [statusReady, setStatusReady] = useState(false);
    const [withdrawData, setWithdrawData] = useState([]);

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
            } catch (error) {
                setStatusReady(false);
                console.error('Error fetching data:', error.message);
                return null;
            }
        }
        
        fetchUserInformation();
    }, [])

    const [onSubmit, setOnSubmit] = useState(false);
    const [amount, setAmount] = useState(0);
    const withdrawBalance = async() => {
        setOnSubmit(true);
        try {

            const response = await axios.post(
                `${apiEndpoint}/withdrawal`,
                { walletAddress: address, amount: amount}
            );
            
            if(response.data.success) {
                // setOnSubmit(false);
                setAmount(0);
                showToast(response.data.message);

                setTimeout(function(){
                    window.location.reload();
                }, 3000);
            }

        } catch (error) {
            setOnSubmit(false);
            console.error('API Error:', error);
            if(error.response) {
                showToast(error.response.data.message, 'error');
            }
            else{
                showToast('Operation failed!', 'error');
            }
        }
    }

    const [userStat, setUserStat] = useState({});
    useEffect(() => {
        var fetchUserStat = async() => {
            try {
                const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
                const response = axios.get(apiEndpoint + '/getUser', {
                            params: {
                                address: address
                            }
                        }).then((response) => {
                            console.log("response.dataresponse.data", response.data)
                            setUserStat(response.data.message[0]);
                        });
            } catch (error) {
                setStatusData(false);
                console.error('Error fetching data:', error.message);
                return null;
            }
        }
        fetchUserStat();
    }, [])
    
    return (
        <>
            <section className="tournament__list-area section-pb-120 section-pt-120" style={{backgroundImage: "url('img/bg/slider_bg.jpg')"}}>
                <div className="container">
                    <AccountRow/>
                    <div className="tournament__wrapper mt-5">

                        <div className="row align-items-end mb-20">
                            <div className="col-lg-12">
                                <div className="blog-post-wrapper" style={{width: '100%'}} >
                                    <div className="tournament__details-content">
                                        <h2 className="title">Instructions</h2>
                                        <blockquote className="blockquoteclass"><p>Instant payments - LIMITATIONS AND CONDITIONS REQUIRED!</p></blockquote>
                                        <p>
                                            Commission: <span className="instructionPercent">0%</span> ; Min. amount: <span className="instructionPercent">0.0001 BNB</span> ; Max. amount: <span className="instructionPercent">10 BNB</span> ;
                                        </p>
                                        <h5>Withdrawal Requirements:</h5>
                                        <p>
                                            <li>
                                                {
                                                    userStat && userStat.irq == 0 && (
                                                        <span className="fa fa-times-circle fa-lg fa-red"></span> 
                                                    )
                                                }
                                                {
                                                    userStat && userStat.irq == 1 && (
                                                        <span className="fa fa-check-circle fa-lg fa-green"></span> 
                                                    )
                                                }
                                                &nbsp; Minimum 1 Referral
                                            </li>
                                            <li>
                                                {
                                                    userStat && userStat.idq == 0 && (
                                                        <span className="fa fa-times-circle fa-lg fa-red"></span> 
                                                    )
                                                }
                                                {
                                                    userStat && userStat.idq == 1 && (
                                                        <span className="fa fa-check-circle fa-lg fa-green"></span> 
                                                    )
                                                }
                                                &nbsp; Minimum 1 Contribution
                                            </li>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-end mb-60">
                            <div className="col-lg-12">
                                <div className="tournament__details-form">
                                    <h4 className="tournament__details-form-title">PAYOUT TO YOUR ADDRESS:</h4>
                                    <p>
                                        <span className="instructionPercent">
                                        {address}
                                        </span>
                                    </p>
                                    <form action="#">
                                        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount *"/>
                                        <button 
                                        disabled={onSubmit} 
                                        type="button"
                                        onClick={withdrawBalance} 
                                        className="tournament__details-form-btn copybtn">
                                            {onSubmit ? 'Submitting...' : 'Withdraw'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-end mb-60">
                            <div className="col-lg-12">
                                <div className="section__title text-center text-lg-start title-shape-none">
                                    <span className="sub-title tg__animate-text ready stop">Withdrawals History</span>
                                    {/* <h3 className="title">Active tournament</h3> */}
                                </div>
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