import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function RecipeCard({name, description, id, picture, createdAt, difficulty}) {
    return (
    <Center py={6}>
        <NextLink href={"/recipes/" + id}>
            
            <Box
                cursor='pointer'
                maxW={'445px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Box
                h={'210px'}
                bg={'gray.100'}
                mt={-6}
                mx={-6}
                mb={6}
                pos={'relative'}>
                <Image
                    src={picture
                    }
                    layout={'fill'}
                    objectFit={'cover'}
                />
                </Box>
                <Stack>
                <Text
                    color={'green.500'}
                    textTransform={'uppercase'}
                    fontWeight={800}
                    fontSize={'sm'}
                    letterSpacing={1.1}>
                    {difficulty}
                </Text>
                <Heading
                    color={useColorModeValue('gray.700', 'white')}
                    fontSize={'2xl'}
                    fontFamily={'body'}>
                    {name}
                </Heading>
                <Text 
                    color={'gray.500'} 
                    isTruncated
                >
                    {description || '---no description---'}
                </Text>
                </Stack>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                {/* <Avatar
                    src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                    alt={'Author'}
                /> */}
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>Achim Rolle</Text>
                    <Text color={'gray.500'}>{new Date(createdAt).toLocaleDateString("no-NO")}</Text>
                </Stack>
                </Stack>
            </Box>
            
        </NextLink>
    </Center>

  );
}