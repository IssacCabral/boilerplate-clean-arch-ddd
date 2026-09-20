import { HttpRequest, HttpResponse } from "./http";

export interface Controller<Request = HttpRequest, Response = unknown> {
  handle(request: Request): Promise<HttpResponse<Response>>;
}
