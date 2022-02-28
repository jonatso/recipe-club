const validatePictureFile = (picturePath) => {
   if ([".jpg", ".png"].includes(picturePath.slice(-4))) {
      return true;
   }
   return false;
};

module.exports = validatePictureFile;
