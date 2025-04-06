// /api/graphql.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("../db");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");
const serverless = require("serverless-http");

require("dotenv").config();

let handler;

module.exports = async (req, res) => {
  if (!handler) {
    await connectDB();

    const app = express();

    // Simple deployment test
    app.get("/", (req, res) => {
      res.status(200).send("Backend deployed successfully!");
    });

    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/api/graphql" });

    handler = serverless(app); // Wrap app as serverless function
  }

  return handler(req, res);
};
