const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const serverless = require("serverless-http");
const connectDB = require("../db");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");
require("dotenv").config();

let handler;

module.exports = async (req, res) => {
  if (!handler) {
    await connectDB();

    const app = express();

    const server = new ApolloServer({ typeDefs, resolvers,   cache: 'bounded', // Add this
    });
    await server.start();
    server.applyMiddleware({ app, path: "/api/graphql" });

    app.get("/", (req, res) => {
      res.status(200).send("Backend deployed successfully!");
    });

    handler = serverless(app);
  }

  return handler(req, res);
};
