import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon} from "@chakra-ui/icons";
import ProfileDetails from "../../components/ProfileDetails";
import LinkButton from "../../core_ui/LinkButton";



export default function UserProfile() {
  const router = useRouter();
  const pid = router.query.id;
  const queryClient = useQueryClient();

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
     setErrMsg("");
    }, []);

    const fetchProfile = async (id) => {
      try {
         const response = await axios.get(`http://localhost:4000/users/${id}`, {
            withCredentials: true,
         });
		 console.log(response.data)
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

   const profile = useQuery("profile", () => fetchProfile(pid), {
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
    <LinkButton
               text={"Back"}
               textColor={"white"}
               bgColor={"orange.400"}
               bgColorHover={"organge.300"}
               url={"/"}
               leftIcon={<ArrowBackIcon />}
               ml={5}
            />
    {!profileData ? <div>Could not fetch this profile</div> : <ProfileDetails profile={profileData} />}
    
    
      </>
   );
  }