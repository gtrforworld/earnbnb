import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function customButton() {
    return (
        <>
            <ConnectButton.Custom>
                                                {({
                                                    account,
                                                    chain,
                                                    openAccountModal,
                                                    openChainModal,
                                                    openConnectModal,
                                                    authenticationStatus,
                                                    mounted,
                                                }) => {
                                                    // Note: If your app doesn't use authentication, you
                                                    // can remove all 'authenticationStatus' checks
                                                    const ready = mounted && authenticationStatus !== 'loading';
                                                    const connected =
                                                    ready &&
                                                    account &&
                                                    chain &&
                                                    (!authenticationStatus ||
                                                        authenticationStatus === 'authenticated');

                                                    return (
                                                    <div
                                                        {...(!ready && {
                                                        'aria-hidden': true,
                                                        'style': {
                                                            opacity: 0,
                                                            pointerEvents: 'none',
                                                            userSelect: 'none',
                                                        },
                                                        })}
                                                    >
                                                        {(() => {
                                                        if (!connected) {
                                                            return (
                                                            <a href="#" onClick={openConnectModal} className="tg-border-btn"><i className="flaticon-edit"></i>
                                                                SIGN IN
                                                            </a>
                                                            );
                                                        }

                                                        if (chain.unsupported) {
                                                            return (
                                                            <button onClick={openChainModal} type="button">
                                                                Wrong network
                                                            </button>
                                                            );
                                                        }

                                                        return (
                                                           <></>
                                                        );
                                                        })()}
                                                    </div>
                                                    );
                                                }}
                                                </ConnectButton.Custom>
        </>
    )
}