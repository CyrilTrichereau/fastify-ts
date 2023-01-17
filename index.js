"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
// https://www.fastify.io/docs/latest/Guides/Getting-Started/
const server = (0, fastify_1.default)({
    logger: true,
});
server.get("/ping", async (request, reply) => {
    return "pong\n";
});
server.get("/auth", {
    preValidation: (request, reply, done) => {
        const { username, password } = request.query;
        done(username !== "admin" ? new Error("Must be admin") : undefined); // only validate `admin` account
    },
}, async (request, reply) => {
    const customerHeader = request.headers["h-Custom"];
    // do something with request data
    return `logged in!`;
});
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
