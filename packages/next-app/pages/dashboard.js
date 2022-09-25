import Header from "./Header"
import Footer from "./components/Footer"
import Web3Button from "./components/Web3Button"
import Transak from "./components/Transak"

import {
    Button,
    Container,
    Flex,
    Heading,
    Stack,
    StatGroup,
    StatLabel,
    StatNumber,
    Stat,
    StatHelpText,
    StatArrow
} from "@chakra-ui/react"
import { useAccount } from "wagmi"

export default function Dashboard() {
    const { address } = useAccount()
    return (
        <>
            <Header />
            <Container maxW={"1640px"} px={"2rem"}>
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
                    <Stack direction="row" spacing={4} align="center" mb="10">
                        <Button bgColor="#42CDC9" color="#FFFFFE" width="100px">
                            Summary
                        </Button>
                        <Button colorScheme="teal" variant="outline">
                            Rewards
                        </Button>
                        <Button colorScheme="teal" variant="outline">
                            Calendar
                        </Button>
                        <Button colorScheme="teal" variant="outline">
                            Settings
                        </Button>
                    </Stack>

                    <Web3Button />
                    <Heading
                        fontWeight={"800"}
                        mb="20"
                        mt="2"
                        color="#333"
                        fontSize={[
                            "1.3rem",
                            "1rem",
                            "1.3rem",
                            "1.3rem",
                            "1.2rem"
                        ]}
                    >
                        Hi {address}!
                    </Heading>

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
                            fontWeight={"800"}
                            mt="1"
                            mb="2"
                            color="#111"
                            fontSize={[
                                "1.3rem",
                                "1rem",
                                "1.3rem",
                                "1.3rem",
                                "1.2rem"
                            ]}
                        >
                            I have been alcohol free for
                        </Heading>
                        <StatGroup mb="20">
                            <Stat mr="10">
                                <StatLabel>Days</StatLabel>
                                <StatNumber>15</StatNumber>
                            </Stat>
                            <Stat mr="10">
                                <StatLabel>Hours</StatLabel>
                                <StatNumber>22</StatNumber>
                            </Stat>
                            <Stat mr="10">
                                <StatLabel>Minutes</StatLabel>
                                <StatNumber>52</StatNumber>
                            </Stat>
                            <Stat>
                                <StatLabel>Seconds</StatLabel>
                                <StatNumber>18</StatNumber>
                            </Stat>
                        </StatGroup>
                        <Heading
                            fontWeight={"800"}
                            mt="1"
                            mb="2"
                            color="#111"
                            fontSize={[
                                "1.3rem",
                                "1rem",
                                "1.3rem",
                                "1.3rem",
                                "1.2rem"
                            ]}
                        >
                            SOBR Tokens Earned
                        </Heading>
                        <StatGroup mb="20">
                            <Stat>
                                <StatNumber>74566.236</StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    23.36%
                                </StatHelpText>
                            </Stat>
                        </StatGroup>
                        <Transak
                            bgColor="#42CDC9"
                            color="#FFFFFE"
                            width="400px"
                        />
                    </Flex>
                </Flex>
            </Container>
            <Footer />
        </>
    )
}
