import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon, MinusIcon } from "@chakra-ui/icons";
import ProfileDetails from "../../components/ProfileDetails";
import LinkButton from "../../core_ui/LinkButton";
import { FaExclamationTriangle } from "react-icons/fa";
import UserDeleteButton from "../../components/UsersTable/UserDeleteButton";

export default function UserProfile() {
   const router = useRouter();
   const pid = router.query.id;
   const queryClient = useQueryClient();
   queryClient.invalidateQueries("profile");

   const [errMsg, setErrMsg] = useState("");

   useEffect(() => {
      setErrMsg("");
   }, []);

   const fetchProfile = async (id) => {
      try {
         const response = await axios.get(`http://localhost:4000/users/${id}`, {
            withCredentials: true,
         });
         console.log(response.data);
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

   const profile = useQuery(`profile${pid}`, () => fetchProfile(pid), {
      enabled: router.isReady,
   });

   const me = useQuery("me", fetchMe, {
      enabled: router.isReady,
   });

   if (me.isLoading || profile.isLoading) {
      return <span>Loading profile...</span>;
   }

   if (me.isError || profile.isError) {
      return <span>Error: {error}</span>;
   }

   const meData = me.data;
   const profileData = profile.data;

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
            {me.isSuccess && meData && profileData && meData.id !== profileData.id && (
               <LinkButton
                  text={"Report"}
                  textColor={"white"}
                  bgColor={"yellow.400"}
                  bgColorHover={"yellow.300"}
                  url={
                     `mailto:owner@recipeclub.com?
               Subject=User report: ` +
                     profileData.username +
                     `&body=My username (optional): ` +
                     me.data.username +
                     `%0D%0A
               I wish to report user ` +
                     profileData.username +
                     ` for the following behaveour which is against website policy (add X where apropriate):%0D%0A
                  - Offensive behaveour: %0D%0A
                  - Rude language: %0D%0A
                  - Personal attacks: %0D%0A
                  - Impersonation: %0D%0A
                  - Explicit content: %0D%0A
                  - Encouraging violence: `
                  }
                  leftIcon={<FaExclamationTriangle />}
                  ml={5}
               />
            )}

            {me.isSuccess && meData && profileData && (meData.id === profileData.id || meData.isSuperuser) && (
               <>
                  <UserDeleteButton id={profileData.id} />
                  <LinkButton
                     text={"Edit"}
                     textColor={"white"}
                     bgColor={"yellow.400"}
                     bgColorHover={"yellow.300"}
                     url={`/profile/edit/${profileData.id}`}
                     leftIcon={<EditIcon />}
                     ml={5}
                  />
               </>
            )}
         </ButtonGroup>
         {!profileData ? <div>Could not fetch this profile</div> : <ProfileDetails profile={profileData} />}
      </>
   );
}
