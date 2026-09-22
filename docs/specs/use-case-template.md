# Use Case Spec

## Nome

```txt
<Action><Entity>UseCase
```

## Intenção

Descreva a ação de aplicação que este use case executa.

## Input DTO

Campos:

- 

## Output DTO

Sucesso:

- 

Erro:

- 

## Regras De Aplicação

- 

## Regras De Domínio Envolvidas

- 

## Ports E Repositories Necessários

- 

## Erros Esperados

- 

## Fluxo

1. 
2. 
3. 

## Arquivos Esperados

- DTO:
- Use case:
- Erros:
- Factory em `main`:

## Verificação

- [ ] Use case não depende de `infra`, `presentation` ou `main`
- [ ] Use case não usa `try/catch` genérico
- [ ] Erros esperados retornam `Either`
- [ ] Falhas técnicas sobem para `SafeUseCase`
- [ ] `pnpm typecheck`
