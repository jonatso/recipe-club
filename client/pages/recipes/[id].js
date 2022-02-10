import dummyRecipes from "../../helpers/dummydata"
import { useRouter } from 'next/router'
import RecipeDetails from "../../components/recipedetails"


export default function Recipe() {
    const router = useRouter()
    const { id } = router.query
    const recipe = dummyRecipes.find(recipe => recipe.id == id)

    return (<RecipeDetails recipe={recipe} />)
}