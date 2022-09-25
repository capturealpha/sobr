import UAuth from "@uauth/js";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@chakra-ui/react";

const uauth = new UAuth({
  clientID: "ddb368fc-a890-41d2-99cf-75f64cf23f9d",
  redirectUri: "http://localhost:3000",
  scope: "openid wallet"
});

function ConnectUNS() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setLoading(true);
    uauth
      .user()
      .then(setUser)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  //Login/out Functions
  const handleLogin = () => {
    setLoading(true);
    uauth
      .loginWithPopup()
      .then(() => uauth.user().then(setUser))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    setLoading(true);
    uauth
      .logout()
      .then(() => setUser(undefined))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  console.log(loading);

  if (user) {
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
        onClick={handleLogout}
      >
        <Avatar
          size="sm"
          name="unstoppable domains"
          src="https://crypto.jobs/storage/company-logos/yC2CISvH6kg2kZkNnzbACeuxOHmlYZj9rzsDbeVx.png"
          mr={2}
        />
        {user.sub}
      </Button>
    );
  }

  return (
    <Button
    bgColor="#42CDC9"
    color="#FFFFFE"
      onClick={handleLogin}
    >
      Login UNS Domains
    </Button>
  );
}
export default ConnectUNS;
