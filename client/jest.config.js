const ignoreFiles = ["src/api/models/index.js"];
const config = {
   verbose: true,
   testPathIgnorePatterns: ignoreFiles,
   collectCoverageFrom: [
      "./src/**/*.{js,jsx}",
      "!**/node_modules/**",
      "!**/vendor/**",
      "!**/coverage/**",
      "!**/.next/**",
      `!${ignoreFiles[0]}`,
   ],
};

module.exports = config;
