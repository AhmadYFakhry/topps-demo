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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onClaim = async (data) => {
    try {
      await axios.patch(
        `https://openscreen.ngrok.io/asset/${props.assetId}`,
        data
      );
      //   toast({
      //     title: `Congratulations, You now own ${props.card.asset.name}!`,
      //     description: "You'll receive a text with more information shortly",
      //     status: "success",
      //     duration: 3000,
      //     isClosable: true,
      //   });
      return;
    } catch (error) {
      //   toast({
      //     title: "Request failed",
      //     description: error,
      //     status: "error",
      //     duration: 3000,
      //     isClosable: true,
      //   });
      return;
    }
  };

  return (
    <Stack spacing={4}>
      <Box marginBottom="20px">
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
        </Stack>
      </form>

      <Button disabled={!errors} onClick={onClaim} color="gray.800">
        CLAIM OWNERSHIP
      </Button>
    </Stack>
  );
};

export default ClaimOwnershipForm;
