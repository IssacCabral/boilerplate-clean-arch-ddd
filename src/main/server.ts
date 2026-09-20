import Fastify from "fastify";
import { registerUserRoutes } from "./routes/user.routes";

export async function buildServer() {
  const app = Fastify({
    logger: true,
  });

  await app.register(registerUserRoutes);

  return app;
}

export async function startServer(): Promise<void> {
  const app = await buildServer();

  await app.ready();

  console.log(`Available routes: ${app.printRoutes()}`);

  await app.listen({
    port: 3333,
    host: "0.0.0.0",
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
