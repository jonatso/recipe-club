import React from "react";
import { HStack, Icon } from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function Rating({ points, numberOfRatings, ...props }) {
   const stars = [];
   for (let i = 1; i <= 5; i++) {
      if (i <= Math.ceil(points)) {
         stars.push(<Icon key={i} as={AiFillStar} />);
      } else {
         stars.push(<Icon key={i} as={AiOutlineStar} />);
      }
   }
   return (
      <HStack {...props}>
         {stars}
         <div>({numberOfRatings !== 0 ? numberOfRatings : "No ratings"})</div>
      </HStack>
   );
}
