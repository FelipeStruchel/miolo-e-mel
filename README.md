# Miolo e Mel

> Aplicativo para cadastro e venda de produtos de panificadora, com pagamento pelo app e entrega agendada.

[![CI](https://github.com/FelipeStruchel/miolo-e-mel/actions/workflows/ci.yml/badge.svg)](https://github.com/FelipeStruchel/miolo-e-mel/actions/workflows/ci.yml)
![Status](https://img.shields.io/badge/status-em%20constru%C3%A7%C3%A3o-yellow)
![Node](https://img.shields.io/badge/node-24-339933?logo=node.js&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-12-F69220?logo=pnpm&logoColor=white)

## Status do projeto

🚧 **Em construção.** O Miolo e Mel ainda não está pronto para uso: o código muda com frequência, funcionalidades estão incompletas e não há versão publicada.

O progresso é acompanhado pelas [issues](https://github.com/FelipeStruchel/miolo-e-mel/issues) deste repositório e por épicos e subtasks na documentação interna.

## Sobre o projeto

Este é o app do **[Samuel Henrique](https://github.com/Samuel-Henrique-de-Camargo)**, desenvolvido por ele com **[Felipe Struchel](https://github.com/FelipeStruchel)** atuando como **mentor**: orienta as decisões de arquitetura e processo e revisa os pull requests. A implementação é do Samuel.

O projeto também serve como espaço de aprendizado, por isso a documentação registra não só o que foi feito, mas as decisões e os aprendizados de cada etapa.

## Tecnologias

- **Monorepo:** pnpm workspaces + Turborepo
- **API:** NestJS + Prisma 7 + PostgreSQL
- **Worker:** processamento assíncrono com BullMQ + Redis
- **Storefront e Admin:** Next.js (App Router), Tailwind v4 e ShadCN
- **Autenticação:** Firebase Auth
- **Testes:** Vitest
- **Qualidade:** ESLint, Prettier, commitlint (Conventional Commits), CodeQL e Dependabot

## Estrutura

```
apps/
  api/          API REST (NestJS + Prisma)
  worker/       Jobs assíncronos (BullMQ)
  storefront/   Loja pública (Next.js)
  admin/        Painel administrativo (Next.js)
packages/
  config/           ESLint, TypeScript e Tailwind compartilhados
  domain/           Regras de negócio puras
  types/            Tipos e DTOs compartilhados
  ui/               Componentes ShadCN compartilhados
  firebase-client/  Cliente Firebase compartilhado
```

O app mobile (React Native) está previsto para o MVP 2 e ainda não existe.

## Como rodar

### Pré-requisitos

- Node.js 24 (versão do arquivo `.nvmrc`)
- pnpm 12 (o `packageManager` do `package.json` indica a versão exata)
- Docker e Docker Compose

### Passo a passo

```bash
# 1. Instale as dependências
pnpm install

# 2. Crie o arquivo de ambiente e preencha as variáveis
cp .env.example .env

# 3. Suba tudo com Docker (Postgres, Redis, API, worker, storefront e admin)
docker compose up -d

# 4. Ou rode os apps em modo de desenvolvimento
pnpm dev
```

As variáveis do Firebase (`NEXT_PUBLIC_FIREBASE_*` e `FIREBASE_SERVICE_ACCOUNT_JSON`) dependem de um projeto Firebase próprio. Nunca comite o `.env`.

### Scripts

| Comando             | O que faz                          |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | Roda os apps em desenvolvimento    |
| `pnpm build`        | Gera o build de todos os apps      |
| `pnpm lint`         | Roda o ESLint                      |
| `pnpm typecheck`    | Confere os tipos (`tsc --noEmit`)  |
| `pnpm test`         | Roda os testes                     |
| `pnpm format`       | Formata o código com o Prettier    |
| `pnpm format:check` | Confere a formatação (usado no CI) |

## Documentação

A documentação técnica fica em um repositório separado, **[miolo-e-mel-docs](https://github.com/FelipeStruchel/miolo-e-mel-docs)**, de uso interno para controle do projeto (acesso restrito aos autores). Ela reúne:

- Premissa e escopo do MVP
- Arquitetura
- Processo de desenvolvimento
- Épicos e subtasks

## Como contribuir

O desenvolvimento segue o fluxo descrito em "Processo de Desenvolvimento", na documentação:

1. Cada tarefa parte de uma issue e vira uma branch própria.
2. Os commits seguem [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (validados pelo commitlint).
3. Toda mudança entra por pull request, com o CI verde (`lint`, `typecheck`, `build`, `test`, `codeql`, `dependency-review`) e aprovação de revisão.

## Autoria

- **[Samuel Henrique](https://github.com/Samuel-Henrique-de-Camargo)**: desenvolvedor e dono do projeto
- **[Felipe Struchel](https://github.com/FelipeStruchel)**: mentoria

## Licença

Software proprietário, todos os direitos reservados a Samuel Henrique de Camargo. Veja o arquivo [LICENSE](LICENSE).
