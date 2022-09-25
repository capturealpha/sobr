import { chain, createClient, configureChains, useAccount } from "wagmi"
import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

export const { chains, provider } = configureChains(
    [
        chain.polygonMumbai,
        chain.mainnet,
        chain.rinkeby,
        chain.optimism,
        chain.arbitrum,
        chain.polygon,
        chain.localhost,
        chain.hardhat
    ],
    [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
)
const { connectors } = getDefaultWallets({
    appName: "SOBR",
    chains
})
export const wagmiClient = createClient({
    // autoConnect: true,
    connectors,
    provider
})
