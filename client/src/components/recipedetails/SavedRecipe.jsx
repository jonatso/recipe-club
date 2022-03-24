import React, { useState, useEffect }  from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { IconButton } from "@chakra-ui/react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export default function SavedRecipe() {
    const router = useRouter();
   const pid = router.query.id;
    const queryClient = useQueryClient();

    const saveMutation = useMutation(async (id) => {
      try {
         const response = await axios(`http://localhost:4000/recipes/save/${id}`, {
         method: "POST", 
         withCredentials: true,
         });
         return response.data;
      } catch (err) {
      console.log(err);
      return err;
      }
   }, {onSuccess: () => {
      queryClient.invalidateQueries("savedRecipes"); }
   });

   const deletesaveMutation = useMutation(async (id) => {
      try {
         const response = await axios(`http://localhost:4000/recipes/deletesaved/${id}`, {
         method: "DELETE", 
         withCredentials: true,
         });
         return response.data;
      } catch (err) {
      console.log(err);
      return err;
      }
   }, {onSuccess: () => {
      queryClient.invalidateQueries("savedRecipes"); }
   });

    const fetchMe = async () => {
        const response = await axios.get("http://localhost:4000/me", {
           withCredentials: true,
        });
        return response.data;
     };
  
     const { data: me } = useQuery("me", fetchMe);

    const fetchSavedRecipes = async () => {
       console.log(me.id)
        try {
           const response = await axios.get(`http://localhost:4000/recipes/saved/${me.id}`, {
              withCredentials: true,
           });
           console.log(response.data)
           return response.data;
        } catch (err) {
           console.log(err);
           return err;
        }
     };
  
     const { data: savedRecipes, error, isLoading, isError, isSuccess } = useQuery("savedRecipes", fetchSavedRecipes, {enabled: !!me.id});
     

   const checkIfRecipeSaved = (recipes, id, isSuccess) => {
      if (!isSuccess) {
         return false
      }

      for (const recipe in recipes) {
          console.log(pid)
          console.log('recipe.id: ' + recipe.id)
          console.log('id: ' +parseInt(id))
           if (recipe.id === parseInt(id)) {
               console.log('hello')
               return true
           } 
        }
        return false
   }
    
    const [isSaved, setIsSaved] = useState(checkIfRecipeSaved(savedRecipes, pid, isSuccess));

    const [errMsg, setErrMsg] = useState("");

   useEffect(() => {
        setErrMsg("");
        setIsSaved(checkIfRecipeSaved(savedRecipes, pid))
        console.log(savedRecipes)
    }, [isSuccess]);

   return (
      <>
      {isSaved ? (<IconButton
        icon={<AiFillStar />}
        color={"white"}
        onClick= {async () => {
        try {
          await deletesaveMutation.mutateAsync(pid);
        } catch (err) {
          console.log(err);
          deletesaveMutation.reset();
        }
        setIsSaved(checkIfRecipeSaved(savedRecipes, pid, isSuccess))
        console.log("save", isSaved)
        }}
    ></IconButton> ) : (<IconButton
        icon={<AiOutlineStar />}
        color={"white"}
        onClick= {async () => {
            try {
              await saveMutation.mutateAsync(pid);
            } catch (err) {
              console.log(err);
              saveMutation.reset();
           }
        setIsSaved(checkIfRecipeSaved(savedRecipes, pid, isSuccess))
        console.log("delete", isSaved)
            }
        }
    ></IconButton>) }</> 
   );
}

 /**
                         * onClick={async () => {
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
                         */
