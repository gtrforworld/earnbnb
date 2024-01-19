import { useAccount, useDisconnect } from 'wagmi'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function refLink() {
    const { isConnected, address } = useAccount({
        onConnect: (isReconnected) => {

        },
        onDisconnect: () => {

        }
    });
    const { disconnect } = useDisconnect()

    useEffect(() => {
        if(address) {
            fetchUserId(address);
        }
    }, [])

    const [refLink, setRefLink] = useState("");

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    var AppUrl = process.env.NEXT_PUBLIC_APP_URL;
    const fetchUserId = async (address) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${apiEndpoint}/getUserId`, {
                    params: { address }, // Include the address parameter
                });

                if(response.data.success) {
                    var link = AppUrl + '?ref=' + response.data.message.id;
                    setRefLink(link);
                }

                return response.data;
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        })
    };

    const [copySuccess, setCopySuccess] = useState(false);

    const copyToClipboard = () => {
        const dummyInput = document.createElement('input');
        dummyInput.value = refLink;
        document.body.appendChild(dummyInput);
        dummyInput.select();
        dummyInput.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');
        document.body.removeChild(dummyInput);
        setCopySuccess(true);
        setTimeout(() => {
        setCopySuccess(false);
        }, 2000);
    };

    return (
        <>
            <div className="row align-items-end mb-60">
                <div className="col-lg-12">
                    <div className="tournament__details-form">
                        <h4 className="tournament__details-form-title">Refer & Earn</h4>
                        <p>Earn solid <span className="instructionPercent">10%</span> from your referral income.</p>
                        <form action="#">
                            <input disabled type="text" placeholder="Name *" value={refLink}/>
                            <button type='button' className="tournament__details-form-btn copybtn" onClick={copyToClipboard}>
                                {copySuccess ? 'Copied!' : 'Click to Copy'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}