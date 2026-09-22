# Checklist: Add Persistence Adapter

Use este checklist ao adicionar ou trocar um adapter de persistência.

- [ ] Confirmar qual repository interface será implementada.
- [ ] Criar adapter em `infra/adapters/persistence/<technology>/<module>`.
- [ ] Criar tipo de persistência específico do adapter, se necessário.
- [ ] Criar mapper com `toDomain()` e `toPersistence()`.
- [ ] Usar `hydrate()` para reconstruir entidades.
- [ ] Usar `restore()` para reconstruir value objects persistidos.
- [ ] Converter value objects para primitivos ao persistir.
- [ ] Não vazar tipos do adapter para domínio ou aplicação.
- [ ] Atualizar factory em `main/factories/infra/persistence`.
- [ ] Manter pool/client de banco como singleton quando aplicável.
- [ ] Garantir shutdown limpo para conexões persistentes quando aplicável.
- [ ] Rodar `pnpm typecheck`.
