"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const autoload_1 = __importDefault(require("@fastify/autoload"));
const path_1 = require("path");
const fastify_1 = __importDefault(require("fastify"));
exports.server = (0, fastify_1.default)({
    logger: true,
});
exports.server.register(autoload_1.default, {
    dir: (0, path_1.join)(__dirname, "routes"),
});
exports.server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
