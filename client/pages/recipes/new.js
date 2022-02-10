import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    Stack,
    Textarea,
    Tooltip,
    useClipboard,
    useColorModeValue,
    VStack,
    Select,
  } from '@chakra-ui/react';
  import React from 'react';
  import { BsGithub, BsLinkedin, BsPerson, BsTwitter } from 'react-icons/bs';
  import { MdEmail, MdOutlineEmail } from 'react-icons/md';

export default function NewRecipe() {
      
    return (
      <Flex
      
        align="center"
        justify="center"
        
        id="contact">
        <Box
        
          p={{ base: 0, lg: 13 }}>
          <Box>
            <VStack spacing={{ base: 4, md: 8, lg: 8 }}>
              <Heading
                fontSize={{
                  base: '4xl',
                  md: '5xl',
                }}>
                Create a recipe
              </Heading>
  
              
                <Box
                  width="500px"
                  bg={useColorModeValue('white', 'gray.700')}
                  borderRadius="lg"
                  boxShadow={'2xl'}
                  p={8}
                  color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                  shadow="base">
                  <VStack spacing={5}>
                    <FormControl isRequired>
                      <FormLabel>Recipe Name</FormLabel>
  
                      
                        <Input type="text" name="name" placeholder="Recipe Name" />
                      
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel htmlFor='type'>Type</FormLabel>
                        <Select id='type' placeholder='Choose type'>
                            <option>Pizza</option>
                            <option>Pasta</option>
                            <option>Vegetar</option>
                        </Select>
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>Ingredients</FormLabel>
                      
                        <Input type="text" name="ingredients" placeholder="Ingredients" />
                    </FormControl>  
                    <FormControl isRequired>
                      <FormLabel>Description</FormLabel>
  
                        <Input
                          type="description"
                          name="description"
                          placeholder="Description"
                        />
                    </FormControl>
  
                    <FormControl isRequired>
                      <FormLabel>Method</FormLabel>
  
                      <Textarea
                        name="method"
                        placeholder="Add your method here"
                        rows={6}
                        resize="none"
                      />
                    </FormControl>
  
                    <Button
                      colorScheme="teal"
                      isFullWidth>
                      Add recipe
                    </Button>
                  </VStack>
                </Box>
            </VStack>
          </Box>
        </Box>
      </Flex>
    );

}
