const { Users } = require("../models");

const isAuthorized = async (ownerId, loggedInUserId) => {
   const user = await Users.findOne({ where: { id: loggedInUserId } });

   if (!user.isSuperuser && ownerId !== loggedInUserId) {
      throw new Error("Is not authorized");
   }
};

module.exports = isAuthorized;
