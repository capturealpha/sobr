import Header from "./Header"
import Footer from "./components/Footer"
import { Button, Container, Flex, Heading, Image } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function Home() {
    const router = useRouter()
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
                    bgGradient="linear(to-r, #AAB4FC, #B3E6ED)"
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
                    <Flex
                        flexDirection={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        h={"100%"}
                        w={"100%"}
                        py={"4rem"}
                        bgColor="#FFFFFE"
                        borderWidth="1px"
                        borderRadius="lg"
                    >
                        <Heading
                            fontWeight={"700"}
                            mt="10"
                            fontSize={[
                                "1.4rem",
                                "1rem",
                                "2.5rem",
                                "3rem",
                                "4rem"
                            ]}
                        >
                            Welcome to SOBR
                        </Heading>
                        <Heading
                            fontWeight={"200"}
                            mt="10"
                            mb="20"
                            color="#AAA"
                            fontSize={[
                                "1.3rem",
                                "1rem",
                                "1.3rem",
                                "1.3rem",
                                "1.2rem"
                            ]}
                        >
                            A Web3 Sobriety Maintenence Platform where your
                            Sobriety earns you rewards
                        </Heading>
                        <Button
                            bgColor="#42CDC9"
                            color="#FFFFFE"
                            width="400px"
                            onClick={() => router.push("/signin")}
                        >
                            Get Started
                        </Button>
                    </Flex>
                </Flex>
            </Container>
            <Footer />
        </>
    )
}
