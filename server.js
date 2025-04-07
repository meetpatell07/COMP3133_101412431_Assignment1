// server.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./db");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

require("dotenv").config();

const app = express();

// Enable CORS for specific domains
const allowedOrigins = ['https://101412431-comp3133-ass2.netlify.app', 'http://localhost:4200'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// CORS configuration (allow frontend URL from Vercel)
const corsOptions = {
    origin: process.env.FRONTEND_URL || "https://101412431-comp3133-assignment2.vercel.app",  // Allow Vercel frontend URL
    credentials: true, // Allow credentials (e.g., cookies) to be sent
};

// Entry point for successful deployment
app.get("/", (req, res) => {
  res.status(200).send("Backend deployed successfully!");
});

connectDB(); // Connect to DB (MongoDB)

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {

    server.applyMiddleware({ app, cors: corsOptions });

  app.listen(process.env.PORT, () => {
    console.log("Server running at http://localhost:4000/graphql");
    console.log("Backend deployed successfully!");  // Optional log in terminal
  });
});

// Error handling (optional but recommended)
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    process.exit(1);
  });
