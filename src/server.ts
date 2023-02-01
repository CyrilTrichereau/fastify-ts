import autoLoad from "@fastify/autoload";
import { join } from "path";
import fastify from "fastify";
import fastifyCompress from "@fastify/compress";
import fastifyHelmet from "@fastify/helmet";
import fastifySensible from "@fastify/sensible";
const fastifyEnv = require("@fastify/env");

// Config Fastify
export const server = fastify({
  logger: true,
});

// Set Helmet
server.register(fastifyHelmet);

// Config compress response
server.register(fastifyCompress);

// Add sensible API
server.register(fastifySensible);

// Config fastify env
const envSchema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
  },
};

const envOptions = {
  confKey: "config",
  dotenv: true,
  schema: envSchema,
  data: process.env,
};
const initialize = async () => {
  server.register(fastifyEnv, envOptions);
  await server.after();
};
initialize();

// Add plugins
server.register(autoLoad, {
  dir: join(__dirname, "plugins"),
});

// Config routes with autoload
server.register(autoLoad, {
  dir: join(__dirname, "routes"),
});

// Config PORT to listen
console.log("PORT : ", process.env.PORT);

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

//Check that all plugins are well connected
server.ready((err) => {
  if (err) throw err;
});

// Start listening
(async () => {
  try {
    await server.ready();
    server.listen({ port: port }, (err, address) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
})();
