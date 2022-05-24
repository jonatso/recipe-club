const { brotliDecompress } = require("zlib");

const validateInputCreate = (body) => {
   if (body.password.length < 3) {
      throw new Error("password is too short");
   }
};

const validateInputEdit = (body) => {
   if (body.password) {
      throw new Error("password update is illegal here");
   }
   if (body.id) {
      throw new Error("id update is illegal here");
   }
};

module.exports = { validateInputCreate, validateInputEdit };
