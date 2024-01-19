import Image from 'next/image'
import IconLogo from '@/app/assets/img/logo/logox.png'

export default function Footer() {
    return (
     <>
         <footer className="footer-style-one">
            <div className="copyright__wrap">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-7">
                            <div className="copyright__text">
                                <p>Copyright © 2024 - All Rights Reserved By <span>EarnBNB</span></p>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="copyright__card text-center text-md-end">
                                <a href="/">
                                    <Image src={IconLogo} width={100} alt="Logo"/>
                                </a> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
     </>
    )
}