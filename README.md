# Desafio Arbitralis - Back-end

Api elaborada para para fornecer os dados da aplicação Meu Tempo, onde o usuário pode acompanhar a previsão do tempo nas cidades de sua preferência.

## Como rodar em desenvolvimento

1. Clone esse repositório
2. Instale as dependências

```bash
npm i
```

3. Configure o arquivo '.env.development' usando o arquivo '.env.example' como modelo
4. Rode todas as migrações

```bash
npm run migration:run
```

5. Execute no ambiente de desenvolvimento:

```bash
npm run start:dev
```