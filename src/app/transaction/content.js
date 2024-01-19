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

    
    return (
        <>
            <section className="tournament__list-area section-pb-120 section-pt-120" style={{backgroundImage: "url('img/bg/slider_bg.jpg')"}}>
                <div className="container">
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
                                    </div>
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
                                                        <td>{withdraw.b}</td>
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