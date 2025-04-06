const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./db");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
require("dotenv").config();


// Vercel Deployment starting
require("dotenv").config();
connectDB();

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen(process.env.PORT, () => console.log("Server running at http://localhost:4000/graphql"));
});
