// api/graphql.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("../db");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");
const { createServer } = require("http");
const { parse } = require("url");

require("dotenv").config();

let serverInstance;

module.exports = async (req, res) => {
  if (!serverInstance) {
    await connectDB(); // Connect to your DB (MongoDB)

    const app = express();

    // Add a simple entry point for successful deployment
    app.get("/", (req, res) => {
      res.status(200).send("Backend deployed successfully!");
    });

    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/api/graphql" });

    serverInstance = app;
  }

  const parsedUrl = parse(req.url, true);
  serverInstance(req, res);
};
