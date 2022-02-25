import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import React, { useState } from 'react';
import NavBar from '../../components/navbar';

//dette bare tester jeg ut, fram til ..
  /* state = {
    status: false,
  }

  handleChange = () => {
    this.setState((prevState) => {
      return {
          ...prevState,
          status: !prevState.status
      }
    })
  } */
  // .. hit
  
  export default function LoginCard() {

    // const [isLoggedIn, setLoggedIn] = useState(false);

    // const login = () =>{
    //   setLoggedIn(!isLoggedIn);
    // }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack data-testid="loginContainer" spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Log in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email" >
                <FormLabel>Email address</FormLabel>
                <Input data-testid="email" type="email" />
              </FormControl>
              <FormControl id="password" >
                <FormLabel>Password</FormLabel>
                <Input data-testid="password" type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox data-testid="checkbox" /*onChange={this.handleChange}*/> Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  data-testid = "login"
                  // onClick={login}
                  color={'white'}
                  colorScheme={'teal'}>
                  Log in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }