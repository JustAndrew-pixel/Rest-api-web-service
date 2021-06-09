import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(HttpException)
export class DeleteHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const uuid = request.url.replace("/friends/", "");

  /*  const errorResponse = {
      statusCode: status,
      type: "https://httpstatuses.com/404",
      timestamp: new Date().toLocaleString(),
      method: request.method,
      path: request.url,
      description: `The friend with uuid=${uuid} hasn\'t been found and can\'t be deleted`,
      error_code: 5404,
      information: "https://documentation/internalErrors/5404"
    };*/

    let errorResponse;

    if (status === 500){
      errorResponse = {
        statusCode: status,
        type: "https://httpstatuses.com/500",
        timestamp: new Date().toLocaleString(),
        method: request.method,
        path: request.url,
        uuid: uuid,
        description: 'A problem has appeared on the Server side',
        //description: exception.message,
        error_code: 5500,
        information: "https://documentation/internalErrors/5500"
      };
    } else if (status === 404) {
      errorResponse = {
        statusCode: status,
        type: "https://httpstatuses.com/404",
        timestamp: new Date().toLocaleString(),
        method: request.method,
        path: request.url,
        description: exception.message,
        error_code: 5404,
        information: "https://documentation/internalErrors/5404"
      };

    }

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'ExceptionFilter',
    );

    response
      .status(status)
      .json(errorResponse);
    }
}