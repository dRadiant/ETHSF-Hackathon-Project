import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ChakraProvider } from '@chakra-ui/react'

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ apiKey: "pUhD6ZzG_LJ9-tHLRnd7-P5bqFAXAS4x" }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'StreamSeed',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} theme={darkTheme()}>
      <React.StrictMode> 
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </React.StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
