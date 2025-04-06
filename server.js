// server.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./db");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

require("dotenv").config();

const app = express();

// Entry point for successful deployment
app.get("/", (req, res) => {
  res.status(200).send("Backend deployed successfully!");
});

connectDB(); // Connect to DB (MongoDB)

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log("Server running at http://localhost:4000/graphql");
    console.log("Backend deployed successfully!");  // Optional log in terminal
  });
});
