const validateParseInt = (id) => {
   if (Number.isInteger(parseInt(id, 10))) {
      return true;
   }
   return false;
};

module.exports = validateParseInt;
