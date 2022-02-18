import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    HStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    IconButton,
  } from '@chakra-ui/react';

  import { FaPlus, FaMinus} from 'react-icons/fa';
  import { MdLocalShipping } from 'react-icons/md';
  import { useState } from 'react';
  
  export default function RecipeDetails({recipe}) {
    const [numPortions, setNumPortions] = useState(4);
    return (
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 10 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={recipe.picture}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {recipe.name}
              </Heading>
              <Text
                color={recipe.difficulty == 'easy' ? 'green.500': recipe.difficulty == 'medium' ? 'yellow.500' : 'red.500'}
                textTransform={'uppercase'}
                fontWeight={800}
                fontSize={'xl'}
                letterSpacing={1.1}>
                {recipe.difficulty}
              </Text>
            </Box>
  
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }>
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={'lg'}>
                {recipe.description}
                </Text>
              </VStack>
              
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Ingredients
                </Text>
                <HStack 
                  bg={useColorModeValue('gray.200', 'gray.600')}
                  width='fit-content'
                  padding='1'
                  borderRadius='md'
                >
                  <IconButton 
                    colorScheme='teal' 
                    icon={<FaMinus />} 
                    onClick={() => setNumPortions(numPortions - 1)}
                    isRound
                  />
                  <Text 
                    fontSize={'lg'} 
                    bg={useColorModeValue('white', 'gray.800')} 
                    pl='6' 
                    pr='6'
                    pt='2'
                    pb='2'
                    borderRadius='md'
                    color={useColorModeValue('gray.800', 'white')}
                  >
                    {numPortions}
                  </Text>
                  <IconButton 
                    colorScheme='teal' 
                    icon={<FaPlus />} 
                    onClick={() => setNumPortions(numPortions + 1)}
                    isRound
                  />
                </HStack>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>Ingredient</Th>
                      <Th isNumeric>Amount</Th>
                      <Th >Unit</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recipe.ingredients.map(ingredient => (
                      <Tr key={ingredient.id}>
                        <Td>{ingredient.name}</Td>
                        <Td isNumeric>{ingredient.quantity * numPortions}</Td>
                        <Td>{ingredient.unit}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                
              </Box>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Method
                </Text>
                  {recipe.method}
              </Box>
            </Stack>
  
            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}>
              Add ingredients to shopping list
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    );
  }