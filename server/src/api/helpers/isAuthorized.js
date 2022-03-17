const { Users } = require("../models");

const isAuthorized = async (ownerId, loggedInUserId) => {
   console.log("checking if user is authorized");
   const user = await Users.findOne({ where: { id: loggedInUserId } });

   console.log("found user");
   if (!user.isSuperuser && ownerId !== loggedInUserId) {
      console.log("user is not authorized");
      throw new Error("Is not authorized");
   }
   console.log("user is authorized");
};

module.exports = isAuthorized;
