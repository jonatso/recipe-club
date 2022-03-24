import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Link, Box, Text, Heading, Button, Stack } from "@chakra-ui/react";
import Router from "next/router";
import NextLink from "next/link";
import {useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import InputField from "../../../core_ui/InputField";
import {useRouter} from "next/router";

export default function Edit() {
   const router = useRouter();
    const pid = router.query.id;
   const queryClient = useQueryClient();
   const [errMsg, setErrMsg] = useState("");


   const fetchUser = async (id) => {
    try {
       const response = await axios.get(`http://localhost:4000/users/${id}`, {
          withCredentials: true,
       });
       return response.data;
    } catch (err) {
       console.log(err);
       return err;
    }
 };

    const user = useQuery("user", () => fetchUser(pid), {
        enabled: router.isReady,
    });

    const initializeData = (data, success) => {
        console.log()
        if (!success) {
           return null;
        }
        return {
           username: data.username,
           email: data.email,
           biography: data.biography,
           facebook_username: data.facebook_username,
           picture: data.picture,
        };
     };
  

     useEffect(() => {
        setErrMsg("");
     }, []);

    const registerMutation = useMutation(async (newUser) => {
        try {
           const response = await axios.put(
            `http://localhost:4000/users/update/${pid}`,
              { ...newUser },
              {
                 withCredentials: true,
              }
           );
           return response.data;
        } catch (err) {
           if (!err?.response) {
              setErrMsg("No server");
              return err;
           }
           if (err.response?.status === 400) {
              setErrMsg("Username or Email already taken");
              return err;
           }
           setErrMsg("Updating user failed...");
           return err;
        }
     });

    if (user.isLoading) {
         return <span>Loading user...</span>;
        }

   return (
      <Formik
         initialValues={initializeData(user.data, user.isSuccess)}
         onSubmit={async (values, actions) => {
            try {
               actions.setSubmitting(true);
               const response = await registerMutation.mutateAsync(values, {
                  onSuccess: () => {
                     queryClient.invalidateQueries("me");
                  },
               });
               if (response.message) {
                  Router.push(`/profile/${pid}`);
               }
            } catch (err) {
               registerMutation.reset();
               actions.setSubmitting(false);
            }
         }}
      >
         {(props) => (
            <Form>
               <Stack spacing={8} mx={"auto"} maxW={"lg"}>
                  <Heading fontSize={"4xl"} textAlign={"center"}>
                     Edit Profile
                  </Heading>

                  <Box rounded={"lg"} bg={"gray.100"} _dark={{ bg: "gray.700" }} boxShadow={"lg"} p={8}>
                     <Stack spacing={4}>
                        {errMsg === "" ? null : (
                           <Box rounded={"lg"} bg={"red.400"} boxShadow={"lg"} p={8}>
                              {errMsg}
                           </Box>
                        )}
                        <InputField
                           name="username"
                           placeholder="username"
                           label="Username"
                           type="username"
                           isRequired={true}
                        />
                        <InputField name="email" placeholder="email" label="Email" type="email" isRequired={true} />
                        <InputField name="biography" placeholder="biography" label="Biography" type="text" isRequired={false} textarea />
                        <InputField name="facebook_username" placeholder="facebook username" label="Facebook username" type="text" isRequired={false} />
                        <InputField name="picture" placeholder="picture (link)" label="Picture URL" type="url" isRequired={false} />
                            
                        <Button size="lg" colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                           Update profile
                        </Button>
                        
                     </Stack>
                  </Box>
               </Stack>
            </Form>
         )}
      </Formik>
   );
}
