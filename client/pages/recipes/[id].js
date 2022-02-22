import dummyRecipes from "../../helpers/dummydata";
import { useRouter } from "next/router";
import RecipeDetails from "../../components/recipedetails";
import NextLink from "next/link";
import { Button, ButtonGroup, IconButton, Link } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Recipe() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState({});
  function deleteRecipe() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe/delete/${id}`).then(
      (res) => {
        if (res.status === 200) {
          router.push("/recipes");
        }
      }
    );
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
      });
  }, []);

  return (
    <>
      <ButtonGroup spacing={2} mt={5} ml={5}>
        <NextLink href="/">
          <Button
            variant={"solid"}
            colorScheme={"teal"}
            size={"sm"}
            leftIcon={<BiLeftArrowAlt />}
          >
            Back
          </Button>
        </NextLink>
        <NextLink href="/">
          <Button
            variant={"solid"}
            colorScheme={"teal"}
            size={"sm"}
            leftIcon={<FaEdit />}
          >
            Edit
          </Button>
        </NextLink>
        <NextLink href="/">
          <Button
            onClick={deleteRecipe}
            variant={"solid"}
            colorScheme={"red"}
            size={"sm"}
            leftIcon={<FaTrash />}
          >
            Delete
          </Button>
        </NextLink>
      </ButtonGroup>
      {Object.keys(recipe).length !== 0 && <RecipeDetails recipe={recipe} />}
    </>
  );
}
