module.exports = {
  setupFiles: [
    "dotenv/config"
  ],
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/build/"]
}