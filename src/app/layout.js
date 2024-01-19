import { Inter } from 'next/font/google'
import './globals.css'
import '@/app/assets/css/plugins.css'
import '@/app/assets/css/main.css'
import Providers from './services/provider'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Earn BNB',
  description: 'Earn BNB on the Binance Smart Chain.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
        {/* <button className="scroll__top scroll-to-target">
            <i className="flaticon-right-arrow"></i>
        </button> */}
        {children}
        </Providers>
        <ToastContainer
          position="top-right"
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
      <Script strategy="afterInteractive" src="js/vendor/jquery-3.6.0.min.js"/>
      <Script strategy="afterInteractive" src="js/plugins.js"/>
      <Script strategy="lazyOnload" src="js/main.js"/>
    </html>
  )
}
