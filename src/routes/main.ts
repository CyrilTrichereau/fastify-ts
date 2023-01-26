"use strict";

module.exports = async (fastify: {
  get: (
    arg0: string,
    arg1: (request: any, reply: any) => Promise<void>
  ) => void;
}) => {
  fastify.get("/", async function (request, reply) {
    await reply.send({ hello: "worlds" });
  });
  fastify.get("/ping", async function (request, reply) {
    await reply.send({ hello: "pong" });
  });
};
