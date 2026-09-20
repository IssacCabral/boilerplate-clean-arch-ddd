import { IError } from "../../../@shared/error.shared";

export type HttpRequest<Body = unknown, Params = unknown, Query = unknown> = {
  body?: Body;
  params?: Params;
  query?: Query;
};

export type HttpResponse<Body = unknown> = {
  statusCode: number;
  body?: Body;
};

export function ok<Body>(body: Body): HttpResponse<Body> {
  return {
    statusCode: 200,
    body,
  };
}

export function created<Body>(body: Body): HttpResponse<Body> {
  return {
    statusCode: 201,
    body,
  };
}

export function badRequest(error: IError): HttpResponse<IError> {
  return {
    statusCode: 400,
    body: error,
  };
}

// todo: verificar se essa validação dinamica é sustentável.
export function applicationError(error: IError): HttpResponse<IError> {
  if (error.code.endsWith("_NOT_FOUND")) {
    return {
      statusCode: 404,
      body: error,
    };
  }

  if (error.code.endsWith("_ALREADY_EXISTS")) {
    return {
      statusCode: 409,
      body: error,
    };
  }

  if (error.code.endsWith("_FAILED")) {
    return {
      statusCode: 500,
      body: error,
    };
  }

  return badRequest(error);
}
