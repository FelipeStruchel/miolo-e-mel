import { parseCorsOrigins } from './cors.js';

describe('parseCorsOrigins', () => {
  it('devolve lista vazia quando a variável não existe', () => {
    expect(parseCorsOrigins(undefined)).toEqual([]);
  });

  it('separa as origens pela vírgula', () => {
    expect(parseCorsOrigins('http://localhost:3001,http://localhost:3002')).toEqual([
      'http://localhost:3001',
      'http://localhost:3002',
    ]);
  });

  it('ignora espaços e itens vazios', () => {
    expect(parseCorsOrigins(' http://localhost:3001 , ,')).toEqual(['http://localhost:3001']);
  });
});
