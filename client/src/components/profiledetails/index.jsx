import React from "react";
import Container from "./Container";
import ProfilePicture from "./ProfilePicture";
import UserInfo from "./UserInfo";

export default function ProfileDetails({ profile }) {
   return (
      <Container>
         <ProfilePicture picture={profile.picture} />
         <UserInfo profile={profile} />
      </Container>
   );
}