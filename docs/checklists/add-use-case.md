# Checklist: Add Use Case

Use este checklist ao adicionar um novo caso de uso.

- [ ] Definir input e output DTOs em `application/<module>/dtos`.
- [ ] Definir erros esperados em `application/<module>/errors`.
- [ ] Confirmar quais repositories ou ports o use case precisa.
- [ ] Receber dependências pelo construtor.
- [ ] Não instanciar adapters concretos dentro do use case.
- [ ] Validar entrada externa criando value objects com `create()`.
- [ ] Retornar `left(error)` para erros esperados.
- [ ] Retornar `right(output)` para sucesso.
- [ ] Não envolver todo o fluxo em `try/catch` genérico.
- [ ] Criar factory em `main/factories/application`.
- [ ] Envolver com `SafeUseCase` quando exposto para controllers.
- [ ] Rodar `pnpm typecheck`.
