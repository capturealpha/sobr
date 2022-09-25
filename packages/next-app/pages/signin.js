import Header from "./Header"
import Footer from "./components/Footer"
import { Container, Flex, Image } from "@chakra-ui/react"
import Web3Button from "./components/Web3Button"
import { useAccount } from "wagmi"
import { useRouter } from "next/router"

export default function SignIn() {
    const { address, isConnected } = useAccount()
    const router = useRouter()
    if (isConnected && address) {
        router.push("/profile")
    }
    return (
        <>
            <Header />
            <Container maxW={"1100px"} px={"2rem"}>
                <Flex
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    h={"100%"}
                    w={"100%"}
                    py={"4rem"}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                >
                    <Image
                        objectFit="cover"
                        src="https://user-images.githubusercontent.com/47368672/191559625-260857f2-22ad-49d5-9f36-54c7d32d9030.png"
                        alt="SOBR"
                        maxH={300}
                        padding="10"
                    />
                    <Web3Button />
                </Flex>
                <Footer />
            </Container>
        </>
    )
}
