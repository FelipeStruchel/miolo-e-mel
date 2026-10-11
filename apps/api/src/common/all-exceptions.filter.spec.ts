import {
  type ArgumentsHost,
  BadRequestException,
  HttpException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter.js';

// Monta um "host" falso: o filtro só chama switchToHttp().getRequest() e .getResponse().
function criarHost() {
  const json = vi.fn(); // espiã: guarda o que foi passado para res.json(...)
  const status = vi.fn().mockReturnValue({ json }); // res.status(...) devolve um objeto com json
  const host = {
    switchToHttp: () => ({
      getRequest: () => ({ url: '/teste' }),
      getResponse: () => ({ status }),
    }),
  } as unknown as ArgumentsHost; // "confie: isto se comporta como um ArgumentsHost"
  return { host, status, json };
}

describe('AllExceptionsFilter', () => {
  const filtro = new AllExceptionsFilter();

  it('padroniza um erro do Nest (404)', () => {
    const { host, status, json } = criarHost();

    filtro.catch(new NotFoundException('Não achei'), host);

    expect(status).toHaveBeenCalledWith(404);
    // objectContaining: confere só estes campos (o timestamp muda a cada execução).
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 404,
        error: 'Not Found',
        message: 'Não achei',
        path: '/teste',
      }),
    );
  });

  it('aceita erro com corpo em texto simples', () => {
    const { host, status, json } = criarHost();

    // HttpException "genérica": o corpo é só uma string e o status é escolhido por nós (418).
    filtro.catch(new HttpException('Sou um bule', 418), host);

    expect(status).toHaveBeenCalledWith(418);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 418, error: 'HttpException', message: 'Sou um bule' }),
    );
  });

  it('mantém a lista de mensagens de validação (400)', () => {
    const { host, status, json } = criarHost();

    filtro.catch(
      new BadRequestException(['phone must be a string', 'name should not be empty']),
      host,
    );

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: ['phone must be a string', 'name should not be empty'],
      }),
    );
  });

  it('esconde detalhes de erro inesperado (500)', () => {
    const { host, status, json } = criarHost();
    // O filtro registra o erro real no log; silenciamos só neste teste para não poluir a saída.
    vi.spyOn(Logger.prototype, 'error').mockImplementation(() => {});

    filtro.catch(new Error('senha do banco: 1234'), host);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 500, message: 'Erro interno do servidor' }),
    );
  });
});
