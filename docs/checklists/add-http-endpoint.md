# Checklist: Add HTTP Endpoint

Use este checklist ao adicionar uma nova rota HTTP.

- [ ] Confirmar o objetivo do endpoint.
- [ ] Definir método e path em `main/routes`.
- [ ] Criar ou reutilizar DTOs em `application/<module>/dtos`.
- [ ] Criar ou reutilizar use case em `application/<module>/use-cases`.
- [ ] Criar schema Zod em `presentation/http/<module>/validators`.
- [ ] Criar controller por ação em `presentation/http/<module>/controllers`.
- [ ] Controller deve receber `HttpRequest` e retornar `HttpResponse`.
- [ ] Controller não deve importar tipos do Fastify.
- [ ] Criar factory do controller em `main/factories/presentation`.
- [ ] Registrar rota usando `adaptFastifyRoute`.
- [ ] Garantir que erros esperados retornem `Either`.
- [ ] Rodar `pnpm typecheck`.
- [ ] Atualizar docs/spec se uma decisão arquitetural mudar.
