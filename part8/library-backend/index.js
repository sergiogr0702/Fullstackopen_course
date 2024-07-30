const config = require("./utils/config");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");

const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const express = require("express");
const cors = require("cors");
const http = require("http");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const logger = require("./utils/logger");
const typeDefs = require("./graphql/types");
const resolvers = require("./graphql/resolvers");

const User = require("./models/user");

mongoose.set("strictQuery", false);
logger.info("Connecting to... ", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.SECRET
          );
          const currentUser = await User.findById(decodedToken.id);
          return { currentUser };
        }
      },
    })
  );

  await new Promise((resolve) =>
    httpServer.listen({ port: config.PORT }, resolve)
  );

  let { address, port } = httpServer.address();
  if (address === "::") address = "localhost";
  const url = `http://${address}:${port}/`;
  const wsUrl = `ws://${address}:${port}/`;

  logger.info(`🚀 Server ready at ${url}`);
  logger.info(`🚀 WebSocket ready at ${wsUrl}`);
};

startServer().catch((error) => {
  logger.error("Failed to start server:", error);
});
