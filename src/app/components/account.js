import { useAccount, useDisconnect } from 'wagmi'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { showToast } from '@/app/services/showToast'

export default function account () {
    const [statusData, setStatusData] = useState(false);

    const [userStat, setUserStat] = useState({});
    const [earnBonus, setEarnBonus] = useState(0);
    const [earnBonusPerSecond, setEarnBonusPerSecond] = useState(0);

    const { isConnected, address } = useAccount();

    useEffect(() => {
        var fetchUserStat = async() => {
            try {
                const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
                const response = axios.get(apiEndpoint + '/getUser', {
                            params: {
                                address: address
                            }
                        }).then((response) => {
                            setUserStat(response.data.message[0]);
                            setEarnBonus(response.data.message[0].bn);
                            var perSecond = (response.data.message[0].ipd / 100 / 60 / 60 / 24) * response.data.message[0].d;
                            setEarnBonusPerSecond(perSecond);
                            setStatusData(true);
                        });
            } catch (error) {
                setStatusData(false);
                console.error('Error fetching data:', error.message);
                return null;
            }
        }
        fetchUserStat();
    }, [])

    useEffect(() => {

        var fetchNewBonus = async() => {
            var newBonus = earnBonus + earnBonusPerSecond;
            var fixFloat = parseFloat(newBonus);
            setEarnBonus(fixFloat);
        }

        const intervalId = setInterval(() => {
            fetchNewBonus();
          }, 1000); // Adjust the interval as needed
      
          // Clean up interval when the component is unmounted
          return () => clearInterval(intervalId);
    }, [earnBonus, earnBonusPerSecond])

    const [onSubmit, setOnSubmit] = useState(false);

    const withdrawIncome = async() => {
        setOnSubmit(true);
        try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_ENDPOINT}/withdraw`,
              { walletAddress: address}
            );
                
            setOnSubmit(false);
            // Handle the response, if needed
            showToast(response.data.message);

            setTimeout(function(){
                window.location.reload();
            }, 3000);
            
            console.log('API Response:', response.data.message);
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
       

    return (
        <>
            {/* data is ready  */}
            {
                statusData && (
                    <>
                        <div className="blog__avatar-wrap mb-4 dashcon">
                            <div className="blog__avatar-info">
                                <span className="designation">
                                    <i className="fa fa-money-bill-alt" aria-hidden="true"></i> 
                                    &nbsp;&nbsp;Your Balance
                                </span>
                                <h4 className="name"><a href="#">{userStat.d.toFixed(8)} BNB</a></h4>
                                {/* <button className="tournament__details-form-btn claimbtn">Increase Your Contribution</button> */}
                            </div>
                        </div>
                        <div className="blog__avatar-wrap mb-4 dashcon">
                            <div className="blog__avatar-info">
                                <span className="designation">
                                    <i className="fa fa-money-bill" aria-hidden="true"></i> 
                                    &nbsp;&nbsp;Your Contribution
                                </span>
                                <h4 className="name"><a href="#">{userStat.r.toFixed(8)} BNB</a></h4>
                                <a href='/increase' className="tournament__details-form-btn claimbtn">Increase Your Contribution</a>
                            </div>
                        </div>
                        <div className="blog__avatar-wrap mb-4 dashcon">
                            <div className="blog__avatar-info">
                                <span className="designation">
                                    <i className="fa fa-money-bill-wave" aria-hidden="true"></i> 
                                    &nbsp;&nbsp;Earning Reward
                                </span>
                                <h4 className="name"><a href="#">{earnBonus > 0 ? earnBonus.toFixed(10) : 0} BNB</a></h4>
                                <button onClick={withdrawIncome}  className="tournament__details-form-btn claimbtn">Withdraw Income</button>
                            </div>
                        </div>
                    </>
                )
            }

            {/* data not ready  */}
            {
                !statusData && (
                    <>
                        <div className="blog__avatar-wrap mb-4 dashcon skeleton">
                            <div className="blog__avatar-info">
                                <span className="designation">
                                    <i className="fa fa-money-bill-alt" aria-hidden="true"></i> 
                                    &nbsp;&nbsp;Your Balance
                                </span>
                                <h4 className="name"><a href="#">0.0000 BNB</a></h4>
                                {/* <button className="tournament__details-form-btn claimbtn">Increase Your Contribution</button> */}
                            </div>
                        </div>
                        <div className="blog__avatar-wrap mb-4 dashcon skeleton">
                            <div className="blog__avatar-info">
                                <span className="designation">
                                    <i className="fa fa-money-bill" aria-hidden="true"></i> 
                                    &nbsp;&nbsp;Your Contribution
                                </span>
                                <h4 className="name"><a href="#">0.0000 BNB</a></h4>
                                <button className="tournament__details-form-btn claimbtn">Increase Your Contribution</button>
                            </div>
                        </div>
                        <div className="blog__avatar-wrap mb-4 dashcon skeleton">
                            <div className="blog__avatar-info">
                                <span className="designation">
                                    <i className="fa fa-money-bill-wave" aria-hidden="true"></i> 
                                    &nbsp;&nbsp;Earning Reward
                                </span>
                                <h4 className="name"><a href="#">0.0000 BNB</a></h4>
                                <button className="tournament__details-form-btn claimbtn">Withdraw Income</button>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}