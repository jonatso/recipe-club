import dummyRecipes from "../../helpers/dummydata"
import { useRouter } from 'next/router'
import RecipeDetails from "../../components/recipedetails"
import NextLink from 'next/link';
import { Button, IconButton, Link } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';


export default function Recipe() {
    const router = useRouter()
    const { id } = router.query
    const recipe = dummyRecipes.find(recipe => recipe.id == id)

    return (
    <>
    {/*  */}
        <NextLink href="/"> 
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              marginLeft={50}
              marginTop={10}
              leftIcon={<BiLeftArrowAlt />}>
                Back
            </Button>
        </NextLink>
        <RecipeDetails recipe={recipe} />
    </>
    )
}