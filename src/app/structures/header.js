"use client"

import Image from 'next/image'
import IconLogo from '@/app/assets/img/logo/logox.png'
import { useAccount, useDisconnect, useFeeData } from 'wagmi'
import CustomConnectButton from './customConnectButton'
import CustomWallet from './customWallet'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { showToast } from '@/app/services/showToast'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Header({menu}) {
    const searchParams = useSearchParams()
    const refID = searchParams.get('ref')

    const router = useRouter();
    const { isConnected, address } = useAccount({
        onConnect: (isReconnected) => {
            console.log("isConnected", isConnected)
            // router.push('/dashboard');
            if(refID) {
                postDataLogin(address, refID);
            }
            else{
                postDataLogin(address);
            }
        },
        onDisconnect: () => {
            router.push('/');
        }
    });
    const { disconnect } = useDisconnect()


    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const postDataLogin = async (address, referral) => {
        try {
          const response = await axios.post(
            `${apiEndpoint}/login`, // Replace with your actual API endpoint path
            { walletAddress: address, refId: referral }
          );
      
          // Handle the response, if needed
          console.log('API Response:', response.data);
        //   showToast('Login Successful');
      
          return response.data;
        } catch (error) {
          // Handle errors
          console.error('API Error:', error);
          showToast('Reload Pages!', 'error');
          //   throw error;
        }
    };

    // useEffect(() => {
    //     // window.location.reload();
    // }, [])

    return (
     <>
         <header>
            <div id="sticky-header" className="tg-header__area transparent-header">
                <div className="container custom-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
                            <div className="tgmenu__wrap">
                                <nav className="tgmenu__nav">
                                    <div className="logo">
                                        <a href="/"><Image src={IconLogo} width={300} height={50} alt="Logo"/></a>
                                    </div>
                                    <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                                        <ul className="navigation">
                                            {
                                                isConnected && <li className={menu == 'home' ? 'active' : ''} ><a href="/dashboard">Dashboard</a></li>
                                            }
                                            {
                                                !isConnected && <li className={menu == 'home' ? 'active' : ''} ><a href="/">Dashboard</a></li>
                                            }
                                            <li className={menu == 'level' ? 'active' : ''} ><a href="/level">Level</a></li>
                                            <li className={menu == 'bonus' ? 'active' : ''} ><a href="/bonus">Bonus</a></li>
                                            <li className={menu == 'referral' ? 'active' : ''} ><a href="/referral">Referrals</a></li>
                                            <li className={menu == 'transaction' ? 'active' : ''} ><a href="/transaction">Withdrawal</a></li>
                                            {/* <li className={menu == 'faq' ? 'active' : ''} ><a href="/faq">FAQ</a></li> */}
                                        </ul>
                                    </div>
                                    <div className="tgmenu__action d-none d-md-block">
                                        <ul className="list-wrap">
                                            <li className="header-btn">
                                                {
                                                    !isConnected && <CustomConnectButton/>
                                                }
                                                {
                                                    isConnected && <CustomWallet chainStatus="false"></CustomWallet>
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>

                            <div className="tgmobile__menu">
                                <nav className="tgmobile__menu-box">
                                    <div className="close-btn"><i className="flaticon-swords-in-cross-arrangement"></i></div>
                                    <div className="nav-logo">
                                        <a href="/"><Image src={IconLogo} width={200} alt="Logo"/></a>
                                    </div>
                                    {/* <div className="tgmobile__search">
                                        <form action="#">
                                            <input type="text" placeholder="Search here..."/>
                                            <button><i className="flaticon-loupe"></i></button>
                                        </form>
                                    </div> */}
                                    <div className="tgmobile__menu-outer">

                                    </div>
                                    {/* <div className="social-links">
                                        <ul className="list-wrap">
                                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                            <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                            <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                                        </ul>
                                    </div> */}
                                </nav>
                            </div>
                            <div className="tgmobile__menu-backdrop"></div>

                        </div>
                    </div>
                </div>
            </div>
        </header>
     </>
    )
}