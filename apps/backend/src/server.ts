import { fastify } from "fastify";
import { fastifyConnectPlugin } from "@connectrpc/connect-fastify";
import routes from "./connect";
import { Database } from "./config/database";
import fastifyCors from "@fastify/cors";


async function main() {
  const server = fastify();

  server.register(fastifyCors, {
    origin: "*", // Allow all origins
  });

  try {
    await Database.connect();

    await server.register(fastifyConnectPlugin, {
      routes,
    });

    server.get("/health", (_, reply) => {
      reply.send({ status: "ok" });
    });

    const port = Number(process.env.PORT) || 8080;
    const host = process.env.HOST || "0.0.0.0";

    await server.listen({ host: host, port: port });
    const address = server.server.address();
    if (typeof address === 'string') {
      console.log(`Server is listening at ${address}`);
    } else if (address && typeof address === 'object') {
      console.log(`Server is listening at ${address.address}:${address.port}`);
    }
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
}

void main();