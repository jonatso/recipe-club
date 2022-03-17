import React, { ReactNode } from 'react';
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
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Loggedin from "./Loggedin";
import NavLink from "./NavLink";

export default function Profile() {

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
              
              <Flex alignItems={'center'}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar 
                    size={"sm"}
                    src='https://bit.ly/broken-link' />
                  </MenuButton>
                  <MenuList>
                    <MenuItem> <Loggedin /> </MenuItem>
                    <MenuItem>
                    <NavLink name="Profile" url={"/profile"} style={{textDecoration:"none"}}/>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>
                    <NavLink name="Users" url={"/users"} style={{textDecoration:"none"}}/>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
    
            {isOpen ? (
              <Box pb={4} display={{ md: 'none' }}>
                <Stack as={'nav'} spacing={4}>
                  {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                  ))}
                </Stack>
              </Box>
            ) : null}
          </Box>
    
        </>
      );
    }