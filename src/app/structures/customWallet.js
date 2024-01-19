import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function customWallet() {
    return (
        <>
            <ConnectButton chainStatus="false"></ConnectButton>
        </>
    )
}