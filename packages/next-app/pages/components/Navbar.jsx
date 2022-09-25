import React from "react"
import { Stack } from "@chakra-ui/react"
import Web3Button from "./Web3Button"
import ConnectUNS from "./Uns"
import Transak from "./Transak"
// import { WorldID } from "./WorldID"
// import { Signin } from "./WorldID";

function Navbar() {
    return (
        <>
            <Stack spacing={4} direction="row" align="center">
                <Transak />
            </Stack>
        </>
    )
}

export default Navbar
