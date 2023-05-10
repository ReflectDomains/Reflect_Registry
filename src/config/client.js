import '@rainbow-me/rainbowkit/styles.css';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import {
	injectedWallet,
	metaMaskWallet,
	walletConnectWallet,
	okxWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { BitKeepWallet } from './customWallets';

import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
	[polygonMumbai],
	[publicProvider()]
);

const connectors = connectorsForWallets([
	{
		groupName: 'Popular',
		wallets: [
			injectedWallet({ chains }),
			metaMaskWallet({ chains }),
			walletConnectWallet({ chains }),
			okxWallet({ chains }),
			BitKeepWallet({ chains }),
		],
	},
]);

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

export { wagmiClient, chains };
