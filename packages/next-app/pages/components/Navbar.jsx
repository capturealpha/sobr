import React from "react";
import { Flex } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ConnectUNS from "./Uns";
import Transak from "./Transak";
import { WorldID } from "./WorldID";
// import { Signin } from "./WorldID";

function Navbar() {
  return (
    <>
      <Flex px={"4em"} py={"1.5em"} justifyContent={"flex-end"}>
        <ConnectButton />
        <ConnectUNS />
        <Transak />
        <WorldID />

      </Flex>
    </>
  );
}

export default Navbar;
