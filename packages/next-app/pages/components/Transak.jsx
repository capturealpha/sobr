
import { Button } from "@chakra-ui/react";
import transakSDK from "@transak/transak-sdk";

var settings;

function componentDidMount() {
    settings = {
        apiKey: '7869fcaa-8d86-4cb6-8d4e-dd7d121b139b',  // Your API Key
        environment: 'STAGING', // STAGING/PRODUCTION
        defaultCryptoCurrency: 'MATIC',
        themeColor: '000000', // App theme color
        hostURL: window.location.origin,
        widgetHeight: "700px",
        widgetWidth: "500px",
    }
}

function openTransak() {
    componentDidMount()
    const transak = new transakSDK(settings);

    transak.init();
}


export default function Transak() {
    return (
   <Button
      colorScheme="teal"
      variant="outline"
      w="4xs"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize={{ base: "md", md: "lg" }}
      cursor="pointer"
      onClick={openTransak}
    >
      Buy Crypto
    </Button>
    );
}
