const ignoreFiles = ["src/api/models/index.js"];
const config = {
   verbose: true,
   testPathIgnorePatterns: ignoreFiles,
   collectCoverageFrom: [
      "./src/api/**/*.{js,jsx}",
      "!**/node_modules/**",
      "!**/vendor/**",
      "!**/coverage/**",
      "!**/migrations/**",
      `!${ignoreFiles[0]}`,
   ],
};

module.exports = config;
