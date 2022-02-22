import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

export default function RecipeCard({
  name,
  description,
  id,
  picture,
  createdAt,
  difficulty,
}) {
  const [isHoveredOver, setIsHoveredOver] = useState(false);
  return (
    <NextLink href={"/recipes/" + id}>
      <Box
        onMouseEnter={() => setIsHoveredOver(true)}
        onMouseLeave={() => setIsHoveredOver(false)}
        cursor="pointer"
        maxW={"445px"}
        minW={"350px"}
        w={"full"}
        bg={
          isHoveredOver
            ? useColorModeValue("gray.50", "whiteAlpha.50")
            : useColorModeValue("white", "gray.900")
        }
        boxShadow={isHoveredOver ? "md" : "base"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
        transform={isHoveredOver ? "translateY(-2px)" : "translateY(0px)"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image src={picture} layout={"fill"} objectFit={"cover"} />
        </Box>
        <Stack>
          <Text
            color={
              difficulty == "easy"
                ? "green.500"
                : difficulty == "medium"
                ? "yellow.500"
                : "red.500"
            }
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {difficulty}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
            textDecoration={isHoveredOver ? "underline" : "none"}
          >
            {name}
          </Heading>
          <Text color={"gray.500"} isTruncated>
            {description || "---no description---"}
          </Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          {/* <Avatar
                    src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                    alt={'Author'}
                /> */}
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={"gray.500"}>
              {new Date(createdAt).toLocaleDateString("no-NO")}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </NextLink>
  );
}
