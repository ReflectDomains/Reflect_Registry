import { InjectedConnector } from "wagmi/connectors/injected";
import bitkeep_base64 from "../assets/base64/bitkeep";

export const BitKeepWallet = ({ chains }) => ({
  id: "BitKeepWallet",
  name: "BitKeep Wallet",
  iconUrl: bitkeep_base64,
  iconBackground: "#0c2f78",
  downloadUrls: {
    android: "https://static.bitkeep.vip/apk/732/BitKeep732_w5.apk",
    ios: "https://apps.apple.com/app/bitkeep/id1395301115",
    browserExtension:
      "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak",
  },
  createConnector: () => {
    const connector = new InjectedConnector({
      chains: chains,
      name: "BitKeep Wallet",
      options: {
        getProvider: () => {
          const provider = window.bitkeep && window.bitkeep.ethereum;
          console.log("bitkeep:", provider);
          if (!provider) {
            // window.open("https://bitkeep.com/en/download?type=2");
            // throw "Please go to our official website to download!!";
            return undefined;
          }
          return provider;
        },
      },
    });

    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return uri;
        },
      },
    };
  },
});
