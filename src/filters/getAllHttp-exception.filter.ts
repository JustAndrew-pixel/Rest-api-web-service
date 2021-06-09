import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(HttpException)
export class GetAllHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let errorResponse;

    if (status === 500){
       errorResponse = {
        statusCode: status,
        type: "https://httpstatuses.com/500",
        timestamp: new Date().toLocaleString(),
        method: request.method,
        path: request.url,
         description: 'A problem has appeared on the Server side',
        //description: exception.message,
        error_code: 2500,
        information: "https://documentation/internalErrors/2500"
      };
    } else if (status === 404) {
      errorResponse = {
        statusCode: status,
        type: "https://httpstatuses.com/404",
        timestamp: new Date().toLocaleString(),
        method: request.method,
        path: request.url,
        description: exception.message,
        error_code: 24040,
        information: "https://documentation/internalErrors/24040"
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