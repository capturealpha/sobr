import React from "react";
import { Flex } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ConnectUNS from "./Uns";
import Transak from "./Transak";


function Navbar() {
  return (
    <>
      <Flex px={"4em"} py={"1.5em"} justifyContent={"flex-end"}>
        <ConnectButton />
        <ConnectUNS />
        <Transak />
      </Flex>
    </>
  );
}

export default Navbar;
