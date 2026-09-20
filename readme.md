# Clean Arch DDD

Boilerplate backend em TypeScript para aplicar Clean Architecture, Domain-Driven Design e Ports and Adapters.

A proposta deste repositório não é ser um projeto didático e opinativo, criado para experimentar uma estrutura de aplicação com limites arquiteturais explícitos, mantendo cada abstração com uma responsabilidade clara.

## Objetivo

Este projeto serve como base e referência para organizar aplicações backend com:

- regras de domínio isoladas de frameworks e infraestrutura;
- casos de uso explícitos na camada de aplicação;
- contratos de entrada e saída por DTOs;
- erros esperados modelados com `Either`;
- adapters de infraestrutura escondidos atrás de ports e repositories;
- controllers HTTP independentes do framework web;
- composition root responsável por montar as instâncias da aplicação.

## Stack Atual

- TypeScript
- Fastify
- Zod
- Persistência em memória
- `tsx` para execução em desenvolvimento
- `tsc` para typecheck

## Estrutura De Pastas

```txt
src/
  @shared/
  domain/
  application/
  presentation/
  infra/
  main/
```

## Camadas

### Domain

Contém entidades, value objects, regras e contratos que pertencem ao domínio.

Exemplos:

```txt
domain/user/entities
domain/user/value-objects
domain/user/repositories
domain/access-control/role
domain/access-control/permission
```

A camada de domínio não depende de framework, banco de dados, HTTP ou qualquer detalhe técnico.

### Application

Contém use cases, DTOs, erros de aplicação e ports.

Exemplos:

```txt
application/user/use-cases
application/user/dtos
application/user/errors
application/ports
```

Use cases orquestram o domínio e dependem de contratos, não de implementações concretas.

### Presentation

Contém a borda HTTP da aplicação: controllers, validators e contratos HTTP internos.

Exemplos:

```txt
presentation/http/user/controllers
presentation/http/user/validators
presentation/http/@shared
```

Controllers recebem uma `HttpRequest`, validam dados de entrada, chamam um use case e traduzem o resultado para `HttpResponse`.

### Infra

Contém implementações técnicas concretas.

Exemplos:

```txt
infra/adapters/persistence
infra/adapters/cryptography
infra/adapters/email
infra/adapters/queue
```

Repositories concretos, adapters de criptografia, email, fila e persistência ficam aqui.

### Main

Contém o composition root da aplicação.

Exemplos:

```txt
main/server.ts
main/routes
main/adapters
main/factories
main/decorators
```

Essa camada monta as dependências concretas, registra rotas, cria controllers, envolve use cases com decorators e inicia o servidor.

## Fluxo De Uma Requisição

```txt
Fastify route
  -> Fastify route adapter
    -> Controller
      -> Use case
        -> Domain
        -> Repository/Port
          -> Infra adapter
```

Exemplo:

```txt
POST /users
  -> CreateUserController
    -> CreateUserUseCase
      -> UserRepository
      -> PasswordHasher
```

## Erros

Erros esperados de domínio e aplicação são retornados com `Either`.

Exemplos:

```txt
USER_ALREADY_EXISTS
USER_NOT_FOUND
USER_INVALID_EMAIL
```

Falhas inesperadas, como erros técnicos de infraestrutura, sobem como exceptions e podem ser tratadas por decorators na borda da aplicação.

## Ports E Adapters

Ports representam capacidades exigidas pela aplicação.

Exemplos:

```txt
PasswordHasher
EmailSender
QueuePublisher
UserRepository
```

Adapters são implementações concretas dessas capacidades.

Exemplos:

```txt
BcryptPasswordHasher
SmtpEmailSender
BullQueuePublisher
MemoryUserRepository
```

## Como Rodar

Instale as dependências:

```bash
pnpm install
```

Execute em desenvolvimento:

```bash
pnpm dev
```

Rode o typecheck:

```bash
pnpm typecheck
```

## Documentação

Algumas decisões arquiteturais estão documentadas em:

```txt
docs/architecture-decisions.md
docs/ddd-building-blocks.md
```

Esses documentos explicam conceitos e tradeoffs adotados durante a evolução do projeto.

## Status

Este projeto ainda está em evolução. A estrutura atual prioriza clareza arquitetural e aprendizado, aceitando um nível maior de separação entre camadas para tornar explícitas as responsabilidades de cada parte do sistema.
