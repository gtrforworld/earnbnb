'use client';

import * as React from 'react';
import { Chain } from 'wagmi'
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  midnightTheme
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  bsc, 
  bscTestnet
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { type } from 'os';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    bsc, 
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const projectId = '8b0136c89531422c113eb50f0bb44b64';

const { wallets } = getDefaultWallets({
  appName: 'Earn BNB',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Earn BNB',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
});

const Providers = ({children}) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} showRecentTransactions={true} theme={midnightTheme({
        accentColor: '#069b43',
        accentColorForeground: 'white',
        fontStack: 'system',
        borderRadius: 'small',  
      })}  appInfo={demoAppInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default Providers;
