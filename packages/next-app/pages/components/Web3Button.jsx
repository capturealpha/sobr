import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button, Image } from "@chakra-ui/react"

function Web3Button() {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== "loading"
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === "authenticated")
                return (
                    <div
                        {...(!ready && {
                            "aria-hidden": true,
                            style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none"
                            }
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button
                                        bgColor="#42CDC9"
                                        color="#FFFFFE"
                                        onClick={openConnectModal}
                                        type="button"
                                    >
                                        Connect Your Wallet
                                    </Button>
                                )
                            }
                            if (chain.unsupported) {
                                return (
                                    <Button
                                        bgColor="#42CDC9"
                                        color="#FFFFFE"
                                        onClick={openChainModal}
                                        type="button"
                                    >
                                        Wrong network
                                    </Button>
                                )
                            }
                            return (
                                <div style={{ display: "flex", gap: 12 }}>
                                    <Button
                                        bgColor="#42CDC9"
                                        color="#FFFFFE"
                                        onClick={openChainModal}
                                        style={{
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background:
                                                        chain.iconBackground,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 999,
                                                    overflow: "hidden",
                                                    marginRight: 4
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <Image
                                                        alt={
                                                            chain.name ??
                                                            "Chain icon"
                                                        }
                                                        src={chain.iconUrl}
                                                        style={{
                                                            width: 12,
                                                            height: 12
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {chain.name}
                                    </Button>
                                    <Button
                                        bgColor="#42CDC9"
                                        color="#FFFFFE"
                                        onClick={openAccountModal}
                                        type="button"
                                    >
                                        {account.displayName}
                                        {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ""}
                                    </Button>
                                </div>
                            )
                        })()}
                    </div>
                )
            }}
        </ConnectButton.Custom>
    )
}

export default Web3Button
