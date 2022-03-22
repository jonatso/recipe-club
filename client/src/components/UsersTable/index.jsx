import React from "react";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import UserButtons from "./UserButtons";

export default function UsersTable({ users }) {
   return (
      <Table variant="simple">
         <Thead>
            <Tr>
               <Th>ID</Th>
               <Th>Username</Th>
               <Th>Email</Th>
               <Th>Options</Th>
            </Tr>
         </Thead>
         <Tbody>
            {users.data.map((user) => (
               <Tr key={user.username}>
                  <Td>{user.id}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                     <UserButtons id={user.id} name={user.username}/>
                  </Td>
               </Tr>
            ))}
         </Tbody>
      </Table>
   );
}
