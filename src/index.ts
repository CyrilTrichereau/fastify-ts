import autoLoad from "@fastify/autoload";
import { join } from "path";
import fastify from "fastify";
import fastifyHelmet from "@fastify/helmet";

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

export const server = fastify({
  logger: true,
});

server.register(fastifyHelmet);

server.register(autoLoad, {
  dir: join(__dirname, "routes"),
});

server.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
