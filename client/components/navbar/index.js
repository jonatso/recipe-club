import { ReactNode , useState} from 'react';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useDisclosure,
  useColorModeValue,
  useColorMode
  
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, } from '@chakra-ui/icons';
import { FaShoppingCart } from 'react-icons/fa';

const Pages = [{name: "Home", link: "/"}, {name: "About", link: "/about"}];
const LoginPages = [{name: "View profile", link: "/profile"}];


//denne brukes ikke?
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
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const login = () =>{
    setLoggedIn(!isLoggedIn);
  }

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
          <Flex alignItems={'center'}>
            <Button
              onClick={login}
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<FaShoppingCart />}>
              Shopping List
            </Button>
            <Button 
              onClick={toggleColorMode}
              mr={4}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            {isLoggedIn ? (
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
              {LoginPages.map((page) => (
                <NextLink href={page.link} passHref>
                  <Link
                    _hover={{
                      textDecoration: 'none',
                      bg: useColorModeValue('gray.200', 'gray.700'),
                    }}
                    key={page.name}
                    >
                    <MenuItem>{page.name}</MenuItem>
                  </Link>
                </NextLink>
              ))}
              <MenuDivider />
                <MenuItem>Sign Out</MenuItem>
              </MenuList>
           </Menu> ) 
            : 
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={6}>
                <NextLink href={"/login"}><Button
                  as={'a'}
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'link'}
                  href={'#'}>
                  Log in
                </Button>
                </NextLink>
                <NextLink href={"/signup"}><Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'orange.400'}
                  href={'#'}
                  _hover={{
                    bg: 'orange.300',
                  }}>
                  Sign Up
                </Button>
                </NextLink>
            </Stack>
            }
          </Flex>
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
    </>
  );
}