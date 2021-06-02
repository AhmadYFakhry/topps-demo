import React, { useState } from "react";
import {
  Stack,
  Heading,
  Button,
  Input,
  InputGroup,
  Text,
  Image,
  Flex,
  Box,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ClaimOwnershipForm = ({ assetId, card }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const addedConsentData = { ...data, consent: "yes" };
    try {
      console.log(data);
      const res = await axios.patch(
        `https://openscreen.ngrok.io/asset/${assetId}/owner`,
        addedConsentData
      );
      toast({
        title: `Congratulations, You now own ${card.asset.name}!`,
        description: "You'll receive a text with more information shortly",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Request failed",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Stack spacing={4}>
      <Box
        border="2px"
        padding="10px"
        borderColor="white"
        borderRadius="5px"
        marginBottom="20px"
      >
        <Heading padding="10px" color="white">
          Card Info
        </Heading>
        <Box margin="auto">
          <Image padding="10px" src={card?.asset.customAttributes?.imageUrl} />

          {!card ? (
            <Spinner color="white" />
          ) : (
            <Box padding="10px">
              <Text color="white">{card?.asset.name}</Text>
              <Text color="white">{card?.asset.description}</Text>
            </Box>
          )}
        </Box>
      </Box>
      <Heading color="gray.100">This card has not been claimed yet!</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Flex>
            <InputGroup marginRight="10px">
              <Input
                bgColor="white"
                {...register("firstName", { required: true })}
                placeholder="First Name"
              />
            </InputGroup>

            <InputGroup>
              <Input
                bgColor="white"
                {...register("lastName", { required: true })}
                placeholder="Last Name"
              />
            </InputGroup>
          </Flex>

          <InputGroup>
            <Input
              bgColor="white"
              {...register("phoneNumber", { required: true })}
              placeholder="Mobile Number"
            />
          </InputGroup>

          <InputGroup>
            <Input
              bgColor="white"
              {...register("emailAddress", { required: true })}
              type="email"
              placeholder="Email"
            />
          </InputGroup>

          <InputGroup>
            <Input
              bgColor="white"
              {...register("address", { required: true })}
              type="text"
              placeholder="Address"
            />
          </InputGroup>

          <InputGroup>
            <Input
              bgColor="white"
              {...register("city", { required: true })}
              type="text"
              placeholder="City"
            />
          </InputGroup>

          <InputGroup>
            <Input
              bgColor="white"
              {...register("provinceOrState", { required: true })}
              type="text"
              placeholder="Province or State"
            />
          </InputGroup>

          <InputGroup>
            <Input
              bgColor="white"
              {...register("country", { required: true })}
              type="text"
              placeholder="Country"
            />
          </InputGroup>

          <InputGroup>
            <Input
              bgColor="white"
              {...register("postalOrZip", { required: true })}
              type="text"
              placeholder="Postal Code or Zip"
            />
          </InputGroup>

          <Button
            type="submit"
            isLoading={loading}
            disabled={!errors}
            color="gray.800"
          >
            Claim Ownership
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default ClaimOwnershipForm;
