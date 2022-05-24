import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Link,
    HStack,
    Avatar,
    Text,
    Divider
  } from '@chakra-ui/react';
  import NextLink from "next/link";

export default function SavedModal({savers}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>Saved by {savers.length} user{savers.length === 1 ? "" : "s"}</Button>
        <Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Saved by</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {savers.map(saver => (
                  <NextLink
                  href={`http://localhost:3000/profile/${saver.id}`}
                  _hover={{
                     cursor: "pointer",
                  }}
               >
                <Link>
                    <Divider />
                <HStack pt={2} pb={2}>
                     <Avatar size={"sm"} src={saver.picture || "https://bit.ly/broken-link"} />
                     <Text>{saver.username}</Text>
                  </HStack>
               </Link>
               </NextLink>
              ))}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }