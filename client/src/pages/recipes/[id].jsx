import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import LinkButton from "../../core_ui/LinkButton";
import RecipeDetails from "../../components/RecipeDetails";

export default function Recipe() {
   const router = useRouter();
   const pid = router.query.id;
   const queryClient = useQueryClient();

   const [errMsg, setErrMsg] = useState("");

   useEffect(() => {
      setErrMsg("");
   }, []);

   const fetchRecipe = async (id) => {
      try {
         const response = await axios.get(`http://localhost:4000/recipes/${id}`, {
            withCredentials: true,
         });
         return response.data;
      } catch (err) {
         console.log(err);
         return err;
      }
   };

   const fetchMe = async () => {
      const response = await axios.get("http://localhost:4000/me", {
         withCredentials: true,
      });
      return response.data;
   };

   const recipe = useQuery("recipe", () => fetchRecipe(pid), {
      enabled: router.isReady,
   });

   const deleteMutation = useMutation(async (id) => {
      try {
         const response = await axios(`http://localhost:4000/recipes/delete/${id}`, {
            method: "DELETE",
            withCredentials: true,
         });
         return response.data;
      } catch (err) {
         if (!err?.response) {
            setErrMsg("No server");
            return err;
         }
         if (err.response?.status === 400) {
            setErrMsg("Something went wrong");
            return err;
         }
         setErrMsg("We can't resovle your delete at this moment");
         return err;
      }
   });

   const me = useQuery("me", fetchMe, {
      enabled: router.isReady,
   });

   if (me.isLoading || recipe.isLoading) {
      return <span>Loading recipe...</span>;
   }

   if (me.isError || recipe.isError) {
      return <span>Error: {error}</span>;
   }

   const meData = me.data;
   const recipeData = recipe.data;
   return (
      <>
         <ButtonGroup>
            <LinkButton
               text={"Back"}
               textColor={"white"}
               bgColor={"orange.400"}
               bgColorHover={"organge.300"}
               url={"/"}
               leftIcon={<ArrowBackIcon />}
               ml={5}
            />
            {me.isSuccess && recipe.isSuccess && meData !== null ? (
               <>
                  {meData.id === recipeData.creatorId || meData.isSuperuser ? (
                     <>
                        <Button
                           backgroundColor={"red"}
                           color="white"
                           size={"md"}
                           ml={2}
                           onClick={async () => {
                              try {
                                 const response = await deleteMutation.mutateAsync(pid, {
                                    onSuccess: () => {
                                       queryClient.invalidateQueries("recipes");
                                    },
                                 });
                                 if (response.message.includes("Recipe deleted")) {
                                    router.push("/");
                                 }
                              } catch (err) {
                                 console.log(err);
                                 deleteMutation.reset();
                              }
                           }}
                           leftIcon={<DeleteIcon />}
                        >
                           Delete
                        </Button>
                        <LinkButton
                           text={"Edit"}
                           textColor={"white"}
                           bgColor={"yellow.400"}
                           bgColorHover={"yellow.300"}
                           url={`/recipes/edit/${recipe.data.id}`}
                           leftIcon={<EditIcon />}
                           ml={2}
                        />
                     </>
                  ) : (
                     <IconButton icon={true ? <AiOutlineStar /> : <AiFillStar />} color={"white"} />
                  )}
               </>
            ) : null}
         </ButtonGroup>
         {!recipeData ? <div>Could not fetch curret recipe</div> : <RecipeDetails recipe={recipeData} />}
      </>
   );
}
