# Decisões de Arquitetura

## Organização de Pastas

Organizamos o código primeiro por camada arquitetural e depois por módulo de domínio.

Exemplo:

```txt
src/
  domain/
    user/
  application/
    user/
  presentation/
    http/
  infra/
    adapters/
  main/
    factories/
    routes/
```

Tradeoff: isso mantém os limites da Clean Architecture explícitos enquanto preserva a coesão do domínio dentro de cada camada.

## Camada de Domínio

Módulos de domínio contêm os conceitos e regras de negócio daquele módulo.

Exemplo:

```txt
src/
  domain/
    user/
      entities/
      value-objects/
      repositories/
      enums/
```

O domínio não deve depender de framework, HTTP, banco de dados, ORM, fila, provedor de email, biblioteca de criptografia ou qualquer outro detalhe de infraestrutura.

Tradeoff: mantemos o domínio agrupado por módulo, como `user`, em vez de agrupar globalmente por categorias técnicas como `entities`, `repositories` e `value-objects`. Isso torna o conceito de domínio mais fácil de entender conforme cresce.

## Camada de Aplicação

Módulos de aplicação contêm casos de uso, DTOs, erros de aplicação e ports exigidas pelos casos de uso.

Exemplo:

```txt
src/
  application/
    ports/
    user/
      use-cases/
      dtos/
      errors/
```

Casos de uso orquestram objetos de domínio e ports. Eles não devem conter detalhes de infraestrutura nem depender de implementações concretas.

Tradeoff: a aplicação também é agrupada por módulo de domínio. Isso mantém os comportamentos de aplicação relacionados a usuário próximos, sem misturar regras de aplicação dentro da camada de domínio.

## Camada de Presentation

A camada de presentation contém a borda HTTP da aplicação.

Exemplo:

```txt
src/
  presentation/
    http/
      @shared/
        controller.ts
        http.ts
        validation-error.ts
      user/
        controllers/
        validators/
```

Controllers devem ser pequenos. Eles recebem uma `HttpRequest`, validam dados de entrada com schemas da própria camada de presentation, chamam um use case e traduzem o resultado para `HttpResponse`.

Tradeoff: mantemos controllers independentes do framework HTTP. O controller não conhece `FastifyRequest` nem `FastifyReply`; essa adaptação fica em `main/adapters`.

## Camada Main

A camada `main` é o composition root da aplicação.

Exemplo:

```txt
src/
  main/
    server.ts
    routes/
    adapters/
    factories/
    decorators/
```

Ela é responsável por criar instâncias concretas, registrar rotas, escolher adapters, envolver use cases com decorators e iniciar o servidor HTTP.

Tradeoff: `main` pode depender das demais camadas porque está na borda mais externa da aplicação. As demais camadas não devem depender de `main`.

## HTTP, Rotas e Validação

O projeto usa Fastify como framework HTTP e Zod para validação de entrada.

Rotas ficam em `main/routes`, porque fazem parte do bootstrap da aplicação e conectam o framework HTTP aos controllers.

Exemplo:

```txt
main/routes/user.routes.ts
```

Schemas de validação ficam na camada de presentation, próximos dos controllers HTTP.

Exemplo:

```txt
presentation/http/user/validators/create-user.schema.ts
```

Tradeoff: Fastify e Zod são detalhes das bordas da aplicação. O domínio e a aplicação não dependem dessas bibliotecas.

## Erros

Erros devem ficar próximos da camada e do módulo que são donos da regra violada.

Erros de aplicação representam falhas esperadas de casos de uso, como usuário não encontrado, usuário já existente ou falha ao completar um fluxo.

Exemplo:

```txt
src/
  application/
    user/
      errors/
        user-not-found.error.ts
        user-already-exists.error.ts
        complete-profile-failed.error.ts
```

Erros de domínio representam violações de regras e invariantes do domínio, como tentar completar um perfil que já foi completado.

Exemplo:

```txt
src/
  domain/
    user/
      errors/
        profile-already-completed.error.ts
```

Convenção:

```txt
Arquivo: complete-profile-failed.error.ts
Const:   CompleteProfileFailedError
Code:    USER_COMPLETE_PROFILE_FAILED
```

O nome do arquivo e da constante não precisam repetir o domínio quando a pasta já fornece esse contexto, como em `application/user/errors` ou `domain/user/errors`.

O `code` deve incluir o domínio porque é um identificador global, usado em API, logs, frontend e documentação.

Exemplo:

```ts
export const CompleteProfileFailedError: IError = {
  code: "USER_COMPLETE_PROFILE_FAILED",
  message: "Failed to complete profile.",
};
```

Tradeoff: usamos códigos semânticos em vez de números sequenciais. Isso evita a necessidade de procurar o último código criado e torna os erros mais legíveis.

## Tratamento de Erros nos Use Cases

Use cases devem retornar erros esperados usando `Either`.

Exemplos de erros esperados:

```txt
USER_ALREADY_EXISTS
USER_NOT_FOUND
USER_INVALID_EMAIL
USER_PROFILE_ALREADY_COMPLETED
```

Erros inesperados, como falha de banco, bug em mapper, falha de adapter ou inconsistência técnica, não devem ser tratados como erro normal de negócio dentro do use case.

Por padrão, use cases não devem envolver todo o fluxo em `try/catch` genérico.

Tradeoff: isso mantém o use case focado em regras de aplicação e evita mascarar bugs como erros genéricos. Falhas inesperadas são tratadas na borda da aplicação por um decorator por composição.

Exemplo atual:

```txt
Controller
  -> SafeUseCase
    -> UseCase concreto
```

## Código Compartilhado

Código compartilhado deve permanecer pequeno e intencional.

Código compartilhado do domínio pode incluir abstrações base e primitivos usados por objetos de domínio, como entidades, value objects, timestamps, erros e tipos de resultado.

Tradeoff: pastas compartilhadas não devem virar depósitos genéricos de utilitários. Se um conceito pertence a um módulo de domínio específico, ele deve ficar lá até existir uma necessidade real de compartilhamento.

## Ports e Adapters

Uma port é uma interface que define o que a aplicação precisa.

Um adapter é uma implementação concreta de infraestrutura para uma port.

Exemplos:

```txt
Port:    PasswordHasher
Adapter: BcryptPasswordHasher

Port:    EmailSender
Adapter: SmtpEmailSender

Port:    QueuePublisher
Adapter: BullQueuePublisher
```

Estrutura recomendada:

```txt
src/
  application/
    ports/
      cryptography/
        password-hasher.port.ts
      email/
        email-sender.port.ts
      queue/
        queue-publisher.port.ts

  infra/
    adapters/
      cryptography/
      email/
      queue/
      persistence/
```

Tradeoff: usamos os nomes explícitos `ports` e `adapters` em vez de uma pasta ampla chamada `services`. Isso deixa a direção das dependências mais clara sem deixar a estrutura complexa.

## Repositories

Interfaces de repository também são ports.

Toda interface de repository é uma port, mas nem toda port é um repository.

Mantemos o nome `Repository` porque ele é um padrão de DDD com semântica de persistência.

Exemplo:

```txt
UserRepository
```

é uma port de persistência, enquanto:

```txt
PasswordHasher
EmailSender
QueuePublisher
```

são ports para outras capacidades externas.

Tradeoff: interfaces de repository ficam próximas do módulo de domínio porque expressam como agregados são recuperados e persistidos pela perspectiva do domínio/aplicação. Repositories concretos ficam nos adapters de infraestrutura.

Quando um método de repository recebe um valor que já é representado por um value object, preferimos receber o value object em vez de um primitivo.

Exemplo:

```ts
findByEmail(email: Email): Promise<UserEntity | null>
```

Motivo: `findByEmail` não aceita qualquer string. Ele espera um email válido, com significado e regra de domínio.

Se a assinatura recebe `string`, qualquer chamada poderia passar valores inválidos:

```ts
findByEmail("abc");
findByEmail("");
findByEmail("qualquer coisa");
```

Ao receber `Email`, o contrato comunica que só buscamos usuário por um email válido.

Tradeoff: adapters de infraestrutura precisam converter o value object para primitivo, como `email.getValue()`, antes de consultar memória, banco, ORM ou API externa.

## Value Objects

Use value objects quando um valor tiver significado de domínio, validação ou comportamento.

Exemplos:

```txt
Email
Password
PasswordHash
UserName
PhoneNumber
DocumentNumber
```

Use enums para estados finitos simples e com pouco comportamento.

Exemplo:

```txt
UserStatus
```

Tradeoff: evite transformar todo primitivo em value object. Prefira value objects quando eles protegem regras ou tornam a linguagem do domínio mais clara.

## Criação e Restauração de Value Objects

Value objects devem ter dois caminhos principais:

```txt
create()
  usado para entrada externa
  retorna Either<IError, ValueObject>

restore()
  usado por mappers e persistência
  retorna ValueObject
  lança erro técnico se o dado persistido estiver inválido
```

`create()` representa validação de dados vindos de fora da aplicação, como DTOs de entrada.

`restore()` representa reconstrução de dados que já foram persistidos. Se um dado persistido não consegue restaurar um value object válido, isso indica falha técnica ou corrupção de dados, não erro esperado de negócio.

Tradeoff: os use cases ficam mais explícitos ao tratar erros esperados, enquanto os mappers continuam simples e não empurram erros técnicos para a camada de aplicação.

## Value Objects Compartilhados

Um value object pode ser compartilhado somente quando representa o mesmo conceito entre módulos de domínio.

Exemplos que podem se tornar compartilhados:

```txt
Email
Money
Address
DocumentNumber
```

Exemplos que normalmente devem permanecer específicos de um módulo:

```txt
UserName
ProductName
CompanyName
```

Tradeoff: se outro módulo importa um value object de `domain/user`, isso pode indicar que o value object deve ir para um local compartilhado do domínio, ou que o outro módulo precisa de seu próprio value object específico.

## Mappers de Persistência

Mappers de persistência convertem entre dados crus do adapter e entidades de domínio.

Exemplo:

```txt
MemoryUserRecord <-> UserEntity
```

Cada adapter deve ter sua própria tipagem de persistência.

Exemplos possíveis:

```txt
MemoryUserRecord
PrismaUser
MongoUserDocument
```

Esses tipos não devem vazar para domínio ou aplicação.

`toDomain()` deve reconstruir a entidade usando `hydrate()` na entidade e `restore()` nos value objects.

`toPersistence()` deve converter a entidade para o formato esperado pelo adapter, usando valores primitivos quando apropriado.

Tradeoff: isso mantém a entidade protegida por value objects e evita acoplamento entre o domínio e formatos específicos de banco, ORM, memória ou cache.



