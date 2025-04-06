const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./db");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

require("dotenv").config();

// Create an Express application
const app = express();

// Entry point for successful deployment
app.get("/", (req, res) => {
  res.status(200).send("Backend deployed successfully!");
});

// Connect to the database (MongoDB)
connectDB();

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  // Apply Apollo server middleware to express app
  server.applyMiddleware({ app });

  // Export the express app to be used by Vercel serverless function
  module.exports = app;
});
