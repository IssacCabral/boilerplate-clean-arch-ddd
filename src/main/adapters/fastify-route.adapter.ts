import { FastifyReply, FastifyRequest } from "fastify";
import { Controller } from "../../presentation/http/@shared/controller";
import { HttpRequest } from "../../presentation/http/@shared/http";

export function adaptFastifyRoute(controller: Controller) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
    };

    const httpResponse = await controller.handle(httpRequest);

    return reply.status(httpResponse.statusCode).send(httpResponse.body);
  };
}
