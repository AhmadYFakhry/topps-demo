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
  Image,
  Flex,
  useToast,
  OrderedList,
  ListItem,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import { useForm } from "react-hook-form";
import axios from "axios";

const TransferOwnership = ({ scanId, card }) => {
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
      const res = await axios.get(`https://openscreen.ngrok.io/contacts`, {
        query: e.target.defaultValue,
      });
      setOptions(res.data.contacts);
    } catch (error) {
      console.log(error);
    }
    setLoadingContacts(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const addedConsentData = { ...data, consent: "yes" };
    try {
      console.log(data);
      const res = await axios.patch(
        `https://openscreen.ngrok.io/asset/${scanId}/owner`,
        addedConsentData
      );
      console.log(res);
      toast({
        title: `Nice! You've requested a trade for ${card.asset.name}!`,
        description: "You'll receive a text with more information shortly",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
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
    <Stack spacing={4} maxW="500px" w="500px">
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
            </div>
          );
        }}
      />
      <Heading color="white">Card Info</Heading>
      <Box
        border="2px"
        borderColor="white"
        borderRadius="5px"
        marginBottom="20px"
        padding="10px"
      >
        <Box margin="10px">
          {!card ? (
            <Spinner color="white" />
          ) : (
            <>
              <Heading color="white">{card?.asset.name}</Heading>
              <Text marginLeft="10px" marginBottom="10px" color="white">
                {card?.asset.description}
              </Text>
              <Image
                padding="10px"
                src={card?.asset.customAttributes?.imageUrl}
              />
              <Accordion maxW="500px" color="white" allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Card Owner Information
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Box marginBottom="20px">
                      <Text fontSize="20pt" fontWeight="bold" color="white">
                        {card?.owner.firstName} {card?.owner.lastName}
                      </Text>
                      <Text>{card?.owner.phoneNumber}</Text>
                    </Box>
                    <Text color="white">PAST OWNERS:</Text>
                    <OrderedList>
                      {card?.owners.map((owner, i) => (
                        <ListItem color="white" key={i}>
                          {owner.firstName} {owner.lastName}
                        </ListItem>
                      ))}
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </Box>
      </Box>

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
            isLoading={loading}
            disabled={!errors}
            type="submit"
            color="gray.800"
          >
            Request Transfer of Ownership
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default TransferOwnership;
