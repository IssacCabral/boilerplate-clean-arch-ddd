# Endpoint Spec

## Objetivo

Descreva o comportamento esperado do endpoint.

## Rota

```txt
METHOD /path
```

## Entrada HTTP

Params:

- 

Query:

- 

Body:

- 

## Schema Zod

Arquivo previsto:

```txt
presentation/http/<module>/validators/<action>.schema.ts
```

## Use Case

Use case chamado pelo controller:

```txt
application/<module>/use-cases/<action>.usecase.ts
```

## Saída HTTP

Sucesso:

- Status:
- Body:

Erros esperados:

- Status:
- Code:
- Message:

## Arquivos Esperados

- Controller:
- Validator:
- Controller factory:
- Route registration:
- Use case ou DTOs:

## Checklist

- [ ] Um controller por ação
- [ ] Controller não importa Fastify
- [ ] Entrada validada com Zod
- [ ] Use case retorna `Either`
- [ ] Erros esperados mapeados para `HttpResponse`
- [ ] Rota registrada em `main/routes`
- [ ] `pnpm typecheck`
