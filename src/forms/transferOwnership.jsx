import React, { useState } from "react";
import {
  Input,
  Stack,
  InputGroup,
  Box,
  Text,
  Heading,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import { useForm } from "react-hook-form";
import axios from "axios";
// import { TextField } from "@material-ui/core";

const TransferOwnership = (props) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [options, setOptions] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option) =>
      option.phoneNumber.toString() + `${option.firstName} ${option.lastName}`,
  });

  const queryContacts = async (e) => {
    try {
      console.log(e.target.defaultValue);
      const res = await axios.get(`https://openscreen.ngrok.io/contacts`, {
        query: e.target.defaultValue,
      });
      //   console.log(res);
      setOptions(res.data.contacts);
      console.log(res.data.contacts);
    } catch (error) {
      console.log(error);
    }
    setLoadingContacts(false);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      toast({
        title: "We've notified the current owner about the request",
        description:
          "You'll receive a text when your request has been processed!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await axios.patch(
        `https://openscreen.ngrok.io/asset/${props.assetId}`,
        data
      );
      setLoading(false);
      return;
    } catch (error) {
      toast({
        title: "Request failed",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);

      return;
    }
  };

  return (
    <Stack spacing={4}>
      <Autocomplete
        id="combo-box-demo"
        onInputChange={queryContacts}
        options={options}
        getOptionLabel={(option) => {
          return (
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                {`${option.firstName} ${option.lastName}`}
              </Text>
              <Text fontSize="sm">{option.phoneNumber}</Text>
            </Box>
          );
        }}
        style={{ width: 300 }}
        filterOptions={filterOptions}
        loading={loadingContacts}
        renderInput={(params) => {
          return (
            <div ref={params.InputProps.ref}>
              <InputGroup size="lg">
                <Input
                  bgColor="white"
                  width="400px"
                  type="text"
                  placeholder="Search Contacts"
                  {...params.inputProps}
                />
              </InputGroup>

              {/* <InputRightAddon children=".com" /> */}
            </div>
          );
        }}
      />
      <Box marginBottom="20px">
        <Heading color="white">Card Info</Heading>
        <Box margin="10px">
          {!props.card ? (
            <Spinner color="white" />
          ) : (
            <>
              <Text color="white">{props.card?.asset.name}</Text>
              <Text color="white">{props.card?.asset.description}</Text>
              <Text color="white">
                CURRENT OWNER: {props.card?.owner.firstName}{" "}
                {props.card?.owner.lastName} {props.card?.owner.phoneNumber}
              </Text>
              <Text color="white">PAST OWNERS:</Text>
            </>
          )}
        </Box>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
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

      <Button
        loading={loading.toString()}
        disabled={!errors}
        type="submit"
        color="gray.800"
      >
        Request Transfer of Ownership
      </Button>
    </Stack>
  );
};

export default TransferOwnership;
