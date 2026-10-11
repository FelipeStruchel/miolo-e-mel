// Recebe o valor cru de CORS_ORIGINS, por exemplo:
//   "http://localhost:3001, http://localhost:3002"
// e devolve: ["http://localhost:3001", "http://localhost:3002"]
export function parseCorsOrigins(raw: string | undefined): string[] {
  if (!raw) return []; // variável ausente ou vazia: nenhuma origem liberada
  return raw
    .split(',') // separa pelas vírgulas
    .map((origin) => origin.trim()) // tira espaços ao redor
    .filter((origin) => origin.length > 0); // descarta pedaços vazios (ex.: vírgula sobrando no fim)
}
