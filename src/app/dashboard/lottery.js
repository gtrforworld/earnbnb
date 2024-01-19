import { useAccount, useDisconnect, useFeeData } from 'wagmi'
import { useEffect, useState } from 'react';
import axios from 'axios';
import CountdownTimer from '@/app/services/countDown';
import { formatDistance, parseISO, differenceInSeconds } from 'date-fns';
import { showToast } from '@/app/services/showToast'
import iconGift from '@/app/assets/img/favicon.png';
import Image from 'next/image';
import IconWinner from '@/app/assets/img/others/winner.jpg';
import utcTimeFormat from '@/app/services/utcTimeDate';
import truncateString from '@/app/services/truncateText';

export default function home () {
    const [statusData, setStatusData] = useState(false);

    const [diffSec, setDiffSec] = useState(0);
    const [lotteryOpen, setLotteryOpen] = useState(false);
    const [nextOpen, setNextOpen] = useState(0);
    const { isConnected, address } = useAccount();

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    useEffect(() => {
        var fetchUser = async() => {
            try {
                axios.get(apiEndpoint + '/getUser', {
                    params: {
                        address: address
                    }
                }).then((response) => {
                    if(response.data.success) {
                        var nextLotteryTime = response.data.message[0].llo;
                        setStatusData(true);
                        setNextOpen(nextLotteryTime);

                        if(nextLotteryTime) {
                            const date1 = new Date(nextLotteryTime); // Replace this with your target date
                            const currentDate = new Date();
                            const timeRemaining = differenceInSeconds(date1, currentDate);
                            setDiffSec(timeRemaining);
                            if(timeRemaining > 0) {
                                setLotteryOpen(false);
                            }
                            else{
                                setLotteryOpen(true);
                            }
                        }else{
                            setLotteryOpen(true);
                        }
                    }
                });
            } catch (error) {
                setStatusData(false);
                console.error('Error fetching data:', error.message);
                return null;
            }
        }
        
        fetchUser();
    }, [])

    var openLotteryTicket = async() => {
        setOnSubmit(true);
        try {
            const response = await axios.post(
              `${apiEndpoint}/lottery`,
              { walletAddress: address}
            );
                
            setLotteryPrize(response.data.message);
            openModal();
            setOnSubmit(false);
            // Handle the response, if needed
            setTimeout(function(){
                window.location.reload();
            }, 5000);
            return response.data;
          } catch (error) {
              // Handle errors
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

    const [showModal, setShowModal] = useState(false);
    const [onSubmit, setOnSubmit] = useState(false);
    const [lotteryPrize, setLotteryPrize] = useState(0);
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const [lotteryStatus, setLotteryStatus] = useState(false);
    const [lotteryHistory, setLotteryHistory] = useState([]);
    const fetchLotteryHistory = () => {
        try {
            axios.get(apiEndpoint + '/lottery').then((response) => {
                if(response.data.success) {
                    setLotteryStatus(true);
                    setLotteryHistory(response.data.message);
                }
            });
        } catch (error) {
            setLotteryStatus(false);
        }
    }

    useEffect(() => {
        fetchLotteryHistory();
    }, [])

    return (
        <>
            <div className="cardlottery">
                <p className="lottery__heading align-items-center">
                    {
                        lotteryOpen && (
                            <button className="button__lottery" disabled={onSubmit} onClick={openLotteryTicket}>
                                OPEN NOW!
                            </button>
                        )
                    }

                    {
                        !lotteryOpen && diffSec > 0 &&(
                            <button className="button__lottery">
                                <CountdownTimer targetDate={nextOpen} />
                            </button>
                        )
                    }
                    
                </p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </div>

            <div className="mt-5">
            <h4 className="match__winner-title">Lottery Winner</h4>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Time</th>
                            <th scope="col">Address</th>
                            <th scope="col">Win</th>
                        </tr>
                    </thead>
                    <tbody className="tbody-light">
                        {
                            lotteryStatus && (
                                lotteryHistory.length > 0 && (
                                    lotteryHistory.map((item, index) => (
                                        <tr key={index}>
                                            <td>{utcTimeFormat(item.t)}</td>
                                            <td>{truncateString(item.ad, 27)}</td>
                                            <td>{item.a} BNB</td>
                                        </tr>
                                    ))
                                )
                            )
                        }

                        {
                            !lotteryStatus && (
                                <>
                                    <tr className='skeleton'><td colSpan={3}>&nbsp;</td></tr>
                                    <tr className='skeleton'><td colSpan={3}>&nbsp;</td></tr>
                                    <tr className='skeleton'><td colSpan={3}>&nbsp;</td></tr>
                                    <tr className='skeleton'><td colSpan={3}>&nbsp;</td></tr>
                                    <tr className='skeleton'><td colSpan={3}>&nbsp;</td></tr>
                                </>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css"/>

            <div id='myModal' className={showModal ? 'modal modal-lg fade show' : 'modal modal-lg fade'}  role="dialog" style={{opacity: 1}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content animated-buttonmodal">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <div className="modal-header">  
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Lottery Prize !!! </h1>
                        </div>
                        <div className="modal-body">
                            <Image src={IconWinner} width={600} alt="icon"/>
                            <div className='row mt-4'>
                                <div className='col-ld-12 text-center'>
                                    <h4 className="tournament__details-form-title">Congratulation's</h4>
                                    <h5>You Win <div className="instructionPercent">{lotteryPrize}</div> from your Lottery.</h5>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" 
                                className="btn btn-secondary" 
                                onClick={closeModal}
                                disabled={onSubmit}
                            >Close</button>
                        </div>
                    </div>
                </div>
            </div>    
        </>
    )
}