# Building Blocks de DDD

## Entidade

Uma entidade é um objeto que possui uma identidade própria.

O que importa não é apenas seus atributos, mas qual objeto ele é.

Imagine dois clientes:

```txt
Cliente A
id = 123
nome = João
email = joao@email.com

Cliente B
id = 456
nome = João
email = joao@email.com
```

Eles têm exatamente os mesmos dados, mas continuam sendo clientes diferentes, porque possuem IDs diferentes.

Em código:

```ts
class Cliente {
  private id: ClienteId;
  private nome: string;
  private email: Email;
}
```

O `id` permite dizer:

```txt
Este é o mesmo cliente de antes.
```

Mesmo que o cliente mude o nome:

```txt
Antes:
Cliente 123 -> João

Depois:
Cliente 123 -> Carlos
```

Continua sendo a mesma entidade.

Regra mental:

```txt
Entidade = identidade importa.
```

## Value Object

Um value object não possui identidade própria.

O que importa é seu valor.

Por exemplo, dinheiro:

```txt
R$ 100,00
```

Você não precisa saber "qual objeto R$ 100 é esse".

Dois objetos:

```ts
Dinheiro(100, "BRL")
Dinheiro(100, "BRL")
```

representam o mesmo valor.

Por isso, normalmente:

```ts
Dinheiro(100, "BRL") == Dinheiro(100, "BRL")
```

conceitualmente significa:

```txt
mesmo valor
```

e não:

```txt
mesma identidade
```

Outro exemplo clássico é endereço:

```ts
class Endereco {
  rua: string;
  numero: string;
  cidade: string;
  estado: string;
  cep: string;
}
```

Se você tiver:

```txt
Rua A, 100, Quixeramobim, CE
```

não importa qual instância representa esse endereço. O que importa é o valor do endereço.

### Um Benefício Importante

Value objects são ótimos para encapsular regras.

Em vez de:

```ts
let cpf: string;
```

você pode ter:

```ts
let cpf: Cpf;
```

E o próprio `Cpf` garante que seu valor seja válido:

```ts
const cpf = Cpf.criar("123.456.789-00");
```

Assim, o restante do sistema não precisa ficar perguntando:

```ts
if (cpf != null && cpf.length === 14) {
  // ...
}
```

Regra mental:

```txt
Value Object = o valor importa, a identidade não.
```

## Agregado

Um agregado é um conjunto de objetos do domínio que deve ser tratado como uma unidade, principalmente para manter suas regras e invariantes.

Por exemplo, imagine um pedido:

```txt
Pedido
├── Cliente
├── Item 1
├── Item 2
└── Item 3
```

O `Pedido` pode ser uma entidade.

Os `ItensPedido` também podem ter identidade dentro do domínio.

Mas você não quer que qualquer parte do sistema faça isso:

```ts
pedido.getItens().add(item);
pedido.getItens().clear();
pedido.getItens().remove(item);
```

sem passar pelas regras do pedido.

Você pode fazer:

```ts
class Pedido {
  private id: PedidoId;
  private itens: ItemPedido[];

  adicionarItem(produto: Produto, quantidade: number) {
    // regras do domínio
  }

  removerItem(produto: Produto) {
    // regras do domínio
  }
}
```

Nesse caso:

```txt
        AGREGADO
           |
           v
        Pedido
       /      \
      /        \
 ItemPedido  ItemPedido
```

O `Pedido` é a aggregate root, ou raiz do agregado.

As operações importantes entram pela raiz:

```ts
pedido.adicionarItem(...);
pedido.removerItem(...);
pedido.confirmar();
pedido.cancelar();
```

e não diretamente:

```ts
itemPedido.alterarQuantidade(...);
```

a partir de qualquer lugar do sistema, se isso puder quebrar uma regra do pedido.

Regra mental:

```txt
Agregado = fronteira de consistência e unidade de negócio.
```

## Juntando Os Três

Imagine um sistema de e-commerce.

Você pode ter:

```txt
Pedido
|
├── PedidoId          -> Value Object
├── ClienteId         -> Value Object
├── EnderecoEntrega   -> Value Object
|
├── ItemPedido        -> Entidade
|   ├── ProdutoId     -> Value Object
|   ├── Quantidade
|   └── Preço         -> Value Object
|
└── StatusPedido      -> Value Object / enum
```

E o conjunto:

```txt
┌─────────────────────────┐
│       AGREGADO          │
│                         │
│        Pedido           │ <- Aggregate Root
│          │              │
│      ┌───┴───┐          │
│      ▼       ▼          │
│    Item     Item        │ <- Entidades
│                         │
│    PedidoId             │ <- Value Object
│    Endereco             │ <- Value Object
│    Dinheiro             │ <- Value Object
└─────────────────────────┘
```

## Uma Analogia Simples

Pense em uma conta bancária.

### Entidade

A conta:

```txt
Conta #12345
```

É uma entidade porque possui identidade.

Mesmo que o saldo mude:

```txt
Conta #12345
saldo = R$ 1.000

↓ depósito

Conta #12345
saldo = R$ 2.000
```

continua sendo a mesma conta.

### Value Object

O dinheiro:

```txt
R$ 1.000,00
```

é um valor.

Você pode ter:

```ts
Dinheiro(1000, "BRL")
```

em vários lugares sem precisar identificar cada instância.

### Agregado

A conta e tudo aquilo que precisa ser consistente junto pode formar um agregado:

```txt
     AGREGADO
        |
        v
    Conta #12345
        |
   ┌────┴────┐
   ▼         ▼
 saldo   operações
```

A conta funciona como aggregate root e controla as alterações:

```ts
conta.depositar(dinheiro);
conta.sacar(dinheiro);
```

em vez de permitir que qualquer objeto externo altere diretamente o saldo.

## A Diferença Mais Importante

Uma forma excelente de memorizar:

### Entidade

Pergunte:

```txt
Preciso saber se este objeto é o mesmo objeto de antes?
```

Se sim, é entidade.

Exemplo:

```txt
Cliente #123
```

### Value Object

Pergunte:

```txt
Só me interessa o valor?
```

Se sim, é value object.

Exemplos:

```txt
R$ 50,00
CEP 63800-000
CPF
```

### Agregado

Pergunte:

```txt
Quais objetos precisam ser modificados/validados juntos para manter uma regra de negócio?
```

Esse conjunto é um agregado.

Exemplo:

```txt
Pedido
├── Itens
├── Endereço
└── regras do pedido
```

E normalmente existe uma aggregate root responsável por proteger essa fronteira.

## Uma Pegadinha Importante

Agregado não é simplesmente "um objeto que contém outros objetos".

Por exemplo:

```ts
class Pessoa {
  endereco: Endereco;
  telefone: Telefone;
}
```

Isso, por si só, não significa que `Pessoa` seja um agregado.

Para ser um agregado em DDD, existe uma razão de domínio para esses objetos formarem uma fronteira de consistência, com uma raiz responsável por controlar as operações.

Essa distinção é importante porque, em sistemas grandes, criar agregados gigantes pode gerar problemas de concorrência, performance e acoplamento.

Em uma frase:

```txt
Entidade responde "quem é?"
Value Object responde "qual é o valor?"
Agregado responde "quais objetos precisam ser tratados juntos para preservar as regras do domínio?"
```
