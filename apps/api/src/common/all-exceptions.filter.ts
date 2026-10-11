import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

// Formato de TODO erro da API:
// {
//   "statusCode": 400,
//   "error": "Bad Request",
//   "message": ["phone must be a string"],   // texto, ou lista de textos (validação)
//   "path": "/users/me",
//   "timestamp": "2026-10-02T23:00:00.000Z"
// }
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    // `host` é o "contexto" da requisição; `switchToHttp()` dá acesso à requisição e à resposta do Express.
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    // Padrão para erros inesperados (bugs): 500, sem vazar detalhes internos para quem chamou.
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let message: string | string[] = 'Erro interno do servidor';

    if (exception instanceof HttpException) {
      // Erros "esperados" do Nest (NotFoundException, UnauthorizedException, validação, rate limit...).
      statusCode = exception.getStatus();
      const body = exception.getResponse();
      if (typeof body === 'string') {
        error = exception.name;
        message = body;
      } else {
        const detalhes = body as { error?: string; message?: string | string[] };
        error = detalhes.error ?? exception.name;
        message = detalhes.message ?? exception.message;
      }
    } else {
      // Erro inesperado: registra o erro completo no log do servidor (o cliente só vê a mensagem genérica).
      this.logger.error(exception);
    }

    response.status(statusCode).json({
      statusCode,
      error,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
