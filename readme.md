## Greetings

Hello, this repository is still under development. I aim to incorporate key software engineering and architecture concepts into a single backend boilerplate to streamline the creation of future projects.

I have no intention of over-engineering anything. However, I like to organize things so that everything doesn't turn into a mess and we can always read the code in the best possible way.

Gradually, I will describe the concepts used in the projects, as well as the reasons and decisions behind specific choices.

## DTO

An application-layer input/output contract

## Clean Arch

### Os Quatro Círculos

**Entities (Entidades):** Regras de negócio da empresa. Existiriam mesmo sem software.

**Use Cases (Casos de Uso):** Regras de negócio da aplicação. Orquestram entidades para realizar tarefas específicas.

**Interface Adapters:** Convertem dados entre o formato dos use cases e o formato de frameworks externos.

**Frameworks & Drivers:** Detalhes técnicos. Banco de dados, web framework, UI.
