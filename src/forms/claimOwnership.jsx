import React, { useState } from "react";
import {
  Stack,
  Heading,
  Button,
  Input,
  InputGroup,
  Text,
  Box,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ClaimOwnershipForm = (props) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onClaim = async (data) => {
    setLoading(true);
    try {
      await axios.patch(
        `https://openscreen.ngrok.io/asset/${props.assetId}/owner`,
        data
      );
      toast({
        title: `Congratulations, You now own ${props.card.asset.name}!`,
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
        borderColor="white"
        borderRadius="5px"
        marginBottom="20px"
      >
        <Heading color="white">Card Info</Heading>
        <Box margin="10px">
          {!props.card ? (
            <Spinner color="white" />
          ) : (
            <>
              <Text color="white">{props.card?.asset.name}</Text>
              <Text color="white">{props.card?.asset.description}</Text>
            </>
          )}
        </Box>
      </Box>
      <Heading color="gray.100">This card has not been claimed yet!</Heading>

      <form onSubmit={handleSubmit(onClaim)}>
        <Stack spacing={4}>
          <InputGroup>
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
              {...register("pin", { required: true })}
              type="password"
              placeholder="Pin"
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

          <InputGroup>
            <Input
              bgColor="white"
              {...register("pin", { required: true })}
              type="password"
              placeholder="Pin"
            />
          </InputGroup>
        </Stack>
      </form>

      <Button
        isLoading={loading}
        disabled={!errors}
        onClick={onClaim}
        color="gray.800"
      >
        Claim Ownership
      </Button>
    </Stack>
  );
};

export default ClaimOwnershipForm;
