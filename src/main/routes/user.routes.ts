import { FastifyInstance } from "fastify";
import { adaptFastifyRoute } from "../adapters/fastify-route.adapter";
import { makeCompleteProfileController } from "../factories/presentation/http/user/make-complete-profile-controller";
import { makeCreateUserController } from "../factories/presentation/http/user/make-create-user-controller";
import { makeGetUserController } from "../factories/presentation/http/user/make-get-user-controller";
import { makeListUsersController } from "../factories/presentation/http/user/make-list-users-controller";

export async function registerUserRoutes(app: FastifyInstance): Promise<void> {
  app.post("/users", adaptFastifyRoute(makeCreateUserController()));
  app.get("/users", adaptFastifyRoute(makeListUsersController()));
  app.get("/users/:id", adaptFastifyRoute(makeGetUserController()));
  app.patch(
    "/users/:id/complete-profile",
    adaptFastifyRoute(makeCompleteProfileController()),
  );
}
