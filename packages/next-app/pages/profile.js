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

export default function Profile() {
    const { address } = useAccount()

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
                        <form
                            method="post"
                            action="api/profile" /* onSubmit={handleSubmit} */
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
                                value={address}
                                textAlign={"left"}
                                name="address"
                                type="hidden"
                                mb="5"
                            />
                            <Center>
                                <Button
                                    bgColor="#42CDC9"
                                    color="#FFFFFE"
                                    width="400px"
                                    type="submit"
                                >
                                    Set Up Now
                                </Button>
                            </Center>
                        </form>
                    </Flex>
                </Stack>
                <Footer />
            </Container>
        </>
    )
}
