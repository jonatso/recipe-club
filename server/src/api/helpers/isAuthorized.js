const isAuthorized = (ownerId, loggedInUserId) => {
   if (ownerId !== loggedInUserId) {
      throw new Error("Is not authorized");
   }
   return;
};

module.exports = isAuthorized;
