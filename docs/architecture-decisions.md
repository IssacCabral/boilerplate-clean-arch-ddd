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
  infra/
    adapters/
  presentation/
    user/
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
Adapter: ResendEmailSender

Port:    QueuePublisher
Adapter: BullQueuePublisher
```

Estrutura recomendada:

```txt
src/
  application/
    ports/
      password-hasher.port.ts
      email-sender.port.ts
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



