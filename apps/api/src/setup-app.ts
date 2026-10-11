import { type INestApplication, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AllExceptionsFilter } from './common/all-exceptions.filter.js';
import { parseCorsOrigins } from './common/cors.js';

export function setupApp(app: INestApplication): void {
  // Headers de segurança (X-Content-Type-Options, Strict-Transport-Security etc.).
  app.use(helmet());

  // CORS: o navegador só deixa uma página chamar a API se a origem dela estiver nesta lista.
  // Autenticamos por header Authorization (Bearer token), não por cookie, então não ligamos `credentials`.
  app.enableCors({ origin: parseCorsOrigins(process.env.CORS_ORIGINS) });

  // Validação de entrada em TODAS as rotas que recebem DTO:
  // - whitelist: campos que não existem no DTO são removidos;
  // - forbidNonWhitelisted: em vez de remover em silêncio, responde 400 se vier campo desconhecido;
  // - transform: converte o corpo cru no tipo do DTO (ex.: "5" vira 5 quando o campo é number).
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  // Formato único de erro (passo 3).
  app.useGlobalFilters(new AllExceptionsFilter());
}
