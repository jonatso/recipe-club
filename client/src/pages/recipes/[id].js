import dummyRecipes from "../../helpers/dummydata"
import { useRouter } from 'next/router'
import RecipeDetails from "../../components/recipedetails"
import NextLink from 'next/link';
import { Button, IconButton, Link } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { useState, useEffect } from "react";


export default function Recipe() {
    const router = useRouter()
    const { id } = router.query
    const [recipe, setRecipe] = useState({})

    useEffect(() => {
		fetch("http://localhost:4000/recipe/" + id)
			.then(res => res.json())
			.then(data => {
				setRecipe(data);
			});
	}, []);
    

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
        {Object.keys(recipe).length !== 0 && <RecipeDetails recipe={recipe} />}
    </>
    )
}