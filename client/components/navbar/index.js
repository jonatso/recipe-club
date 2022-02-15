import { ReactNode } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Spacer,
  Tooltip,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';

const Pages = [{name: "Home", link: "/"}, {name: "About", link: "/about"}];

const NavLink = ({ children}) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    >
    {children}
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Pages.map((page) => (
                <NextLink href={page.link} passHref>
                  <Link
                    px={2}
                    py={1}
                    rounded={'md'}
                    _hover={{
                      textDecoration: 'none',
                      bg: useColorModeValue('gray.200', 'gray.700'),
                    }}
                    key={page.name}
                    >
                    {page.name}
                  </Link>
                </NextLink>
              ))}
            </HStack>
          </HStack>
          <HStack spacing={6} alignItems={'center'}>
            <InputGroup>
              <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon color='gray.300' />}
              />
              <Input type='search' placeholder='Search for recipe' />
            </InputGroup>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              width='200px'
              leftIcon={<AddIcon />}>
              New recipe
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>View Profile</MenuItem>
                <MenuItem>My recipes</MenuItem>
                <MenuDivider />
                <MenuItem>Sign Out</MenuItem>
              </MenuList>
            </Menu>
            </HStack>
          </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Pages.map((page) => (
                <NextLink href={page.link} passHref>
                  <Link
                    px={2}
                    py={1}
                    rounded={'md'}
                    _hover={{
                      textDecoration: 'none',
                      bg: useColorModeValue('gray.200', 'gray.700'),
                    }}
                    key={page.name}
                    >
                    {page.name}
                  </Link>
                </NextLink>

              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

        {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}