import { Body, Controller, INestApplication, Post } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IsString } from 'class-validator';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { setupApp } from '../src/setup-app.js';

// DTO (Data Transfer Object): descreve o formato aceito no corpo da requisição.
// O `!` diz ao TypeScript "este campo sempre vem preenchido" (o ValidationPipe garante).
class EcoDto {
  @IsString()
  texto!: string;
}

// Rota existente só neste teste, para exercitar o ValidationPipe.
@Controller('eco')
class EcoController {
  @Post()
  eco(@Body() dto: EcoDto) {
    return dto;
  }
}

describe('Segurança da API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    process.env.CORS_ORIGINS = 'http://localhost:3001';
    const modulo = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [EcoController],
    }).compile();
    app = modulo.createNestApplication();
    setupApp(app); // a MESMA configuração do main.ts
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('envia headers de segurança (helmet)', async () => {
    const res = await request(app.getHttpServer()).get('/health');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });

  it('libera CORS só para origem configurada', async () => {
    const permitida = await request(app.getHttpServer())
      .get('/health')
      .set('Origin', 'http://localhost:3001');
    expect(permitida.headers['access-control-allow-origin']).toBe('http://localhost:3001');

    const negada = await request(app.getHttpServer())
      .get('/health')
      .set('Origin', 'http://site-qualquer.com');
    expect(negada.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('responde 404 no formato padrão de erro', async () => {
    const res = await request(app.getHttpServer()).get('/nao-existe');
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ statusCode: 404, error: 'Not Found', path: '/nao-existe' });
    expect(typeof res.body.timestamp).toBe('string');
  });

  it('rejeita corpo inválido e campo desconhecido com 400', async () => {
    const invalido = await request(app.getHttpServer()).post('/eco').send({ texto: 123 });
    expect(invalido.status).toBe(400);
    expect(invalido.body.message).toContain('texto must be a string');

    const desconhecido = await request(app.getHttpServer())
      .post('/eco')
      .send({ texto: 'oi', extra: true });
    expect(desconhecido.status).toBe(400);

    const valido = await request(app.getHttpServer()).post('/eco').send({ texto: 'oi' });
    expect(valido.status).toBe(201);
    expect(valido.body).toEqual({ texto: 'oi' });
  });

  it('devolve 429 depois de 100 requisições no mesmo minuto', async () => {
    for (let i = 0; i < 100; i++) {
      await request(app.getHttpServer()).get('/health').expect(200);
    }
    const res = await request(app.getHttpServer()).get('/health');
    expect(res.status).toBe(429);
    expect(res.body.statusCode).toBe(429);
  });
});
