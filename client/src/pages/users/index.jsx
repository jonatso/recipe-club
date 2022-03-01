import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import PageContainer from "../../core_ui/PageContainer";
import UsersTable from "../../components/UsersTable";

export default function Users() {
   const router = useRouter();

   const fetchUsers = async (id) => {
      try {
         const response = await axios.get(`http://localhost:4000/users`, {
            withCredentials: true,
         });
         return response.data;
      } catch (err) {
         console.log(err);
         return err;
      }
   };

   const users = useQuery("users", fetchUsers);

   if (users.isLoading) {
      return <span>Loading recipe...</span>;
   }

   if (users.isError) {
      return <span>Error: {error}</span>;
   }

   return (
      <PageContainer>
         <UsersTable users={users} />
      </PageContainer>
   );
}
