import React, { useState, useEffect } from "react";
import ClaimOwnershipForm from "../forms/claimOwnership";
import TransferOwnership from "../forms/transferOwnership";
import { useParams } from "react-router";
import { Center, Spinner } from "@chakra-ui/react";
import axios from "axios";

const Home = () => {
  const { scanId } = useParams();
  //   const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState(null);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    axios
      .get(`https://openscreen.ngrok.io/asset/${scanId}`)
      .then((res) => {
        console.log(res);
        setCard(res.data);
        setOwner(res.data.owner);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [scanId]);

  return (
    <>
      {!card ? (
        <Center bgColor="gray.700" height="100vh">
          <Spinner size="xl" color="white" />
        </Center>
      ) : (
        <Center bgColor="gray.700" height="100%" padding="50px">
          {owner ? (
            <TransferOwnership scanId={scanId} card={card} />
          ) : (
            <ClaimOwnershipForm scanId={scanId} card={card} />
          )}
        </Center>
      )}
    </>
  );
};

export default Home;
