import Header from "./Header"
import Footer from "./components/Footer"
import {
    Button,
    Container,
    Flex,
    Input,
    Heading,
    Stack,
    Center
} from "@chakra-ui/react"
import { useAccount } from "wagmi"
import { WorldID } from "./components/WorldID"
import Web3Button from "./components/Web3Button"
import ConnectUNS from "./components/Uns"
import { useRouter } from "next/router"

export default function Profile() {
    const { address } = useAccount()
    const router = useRouter()

    return (
        <>
            <Header />
            <Container maxW={"1100px"} px={"2rem"}>
                <Stack spacing={"1em"} align={"center"}>
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
                        <Heading
                            fontWeight={"700"}
                            fontSize={[
                                "1.4rem",
                                "1rem",
                                "1.5rem",
                                "1.5rem",
                                "1.5rem"
                            ]}
                            mb="10"
                            mt="10"
                        >
                            Set up your Profile:
                        </Heading>
                        <ConnectUNS />
                        <Heading mb="5" mt="5">-- OR --</Heading>
                          <Web3Button />
                        <form
                            method="post"
                            action="api/profile"
                        >
                            <Input
                                mx={"auto"}
                                variant={"outline"}
                                placeholder="Username"
                                textAlign={"left"}
                                name="username"
                                mb="5"
                            />
                            <Input
                                mx={"auto"}
                                variant={"outline"}
                                placeholder="Email (optional)"
                                textAlign={"left"}
                                name="email"
                                mb="5"
                            />
                            <Input
                                mx={"auto"}
                                variant={"outline"}
                                placeholder="Phone (optional)"
                                textAlign={"left"}
                                name="phone"
                                mb="5"
                            />
                            <Input
                                mx={"auto"}
                                variant={"outline"}
                                value= {address}
                                textAlign={"left"}
                                name="address"
                                type="hidden"
                                mb="5"
                            />
                            <Center mb="10">
                                <Button
                                    bgColor="#42CDC9"
                                    color="#FFFFFE"
                                    width="400px"
                                    type="submit"
                                    onClick={() => router.push("/dashboard")}
                                >
                                    Set Up Now
                                </Button>
                            </Center>
                        </form>
                        <WorldID />
                    </Flex>
                </Stack>
                <Footer />
            </Container>
        </>
    )
}
