# Backend Sparring

Backend Sparring é uma API GraphQL construída com Node.js e NestJS que utiliza TypeScript, Prisma ORM e PostgreSQL para oferecer uma base sólida de gestão de organizações aeronáuticas fictícias. O projeto foi pensado para servir como material de estudo e experimentação, demonstrando boas práticas de arquitetura, camadas bem definidas e integração com um banco relacional moderno.

## Visão Geral da Aplicação
- **API**: GraphQL exposta via Apollo Server, com _playground_ habilitado para facilitar inspeção e testes.
- **Framework**: NestJS 10, explorando módulos, injeção de dependências, _providers_ e resolvers.
- **ORM**: Prisma Client, responsável pelo acesso ao banco PostgreSQL e pela geração de tipos fortemente tipados.
- **Banco de dados**: PostgreSQL, definido através do arquivo `prisma/schema.prisma` e configurado via variável `DATABASE_URL`.
- **Domínio principal**: CRUD completo para entidades de **Organização**, incluindo campos de métricas operacionais e observações.

## Arquitetura e Organização do Código
A estrutura segue os princípios modulares do NestJS:

```
src/
├── main.ts                  # inicialização da aplicação Nest e configuração de CORS
├── app.module.ts            # módulo raiz que agrega GraphQL, Prisma e módulos de domínio
├── prisma/                  # módulo com o PrismaService (injeção do client e hooks de shutdown)
└── organization/            # domínio principal com DTOs, entidade, service e resolver GraphQL
```

- **`PrismaModule` / `PrismaService`**: encapsulam a criação e o ciclo de vida do Prisma Client, permitindo reuso em toda a aplicação.
- **`OrganizationModule`**: agrupa o resolver GraphQL e o service que orquestra as operações de persistência.
- **DTOs (`CreateOrganizationInput`, `UpdateOrganizationInput`)**: definem o formato dos dados aceitos nas mutações, garantindo validação em tempo de compilação.
- **Entidade `Organization`**: espelha o modelo Prisma e define a forma como os dados são retornados no schema GraphQL.

## Modelo de Dados
O arquivo [`prisma/schema.prisma`](prisma/schema.prisma) descreve a tabela `organizations`, incluindo colunas auxiliares de auditoria (`createdAt`, `updatedAt`, `deletedAt`). Sempre que o schema é alterado, basta rodar `npx prisma migrate dev --name <descricao>` para gerar e aplicar migrações.

### Variáveis de Ambiente Obrigatórias
Crie um arquivo `.env` na raiz do projeto com a string de conexão do banco:

```dotenv
DATABASE_URL="postgresql://usuario:senha@localhost:5432/backend_sparring?schema=public"
```

## Pré-requisitos
- Node.js 18 ou superior
- npm 9 ou superior (ou outro gerenciador compatível, como pnpm ou yarn)
- PostgreSQL acessível (local ou remoto)

## Instalação e Configuração
1. **Instalar dependências**
   ```bash
   npm install
   ```
2. **Gerar artefatos do Prisma (opcional em dev, mas recomendado)**
   ```bash
   npx prisma generate
   ```
3. **Executar migrações**
   ```bash
   npx prisma migrate dev
   ```
4. **(Opcional) Popular o banco** – ajuste `prisma/seed.ts` (quando existir) e rode `npx prisma db seed`.

## Executando a Aplicação
- **Modo desenvolvimento (hot reload)**
  ```bash
  npm run start:dev
  ```
- **Modo padrão**
  ```bash
  npm run start
  ```
- **Modo produção (usa build em `dist/`)**
  ```bash
  npm run build
  npm run start:prod
  ```

A aplicação fica acessível em `http://localhost:3000/graphql`. O Apollo Sandbox/Playground permite executar queries e mutações diretamente do navegador.

## Operações GraphQL Disponíveis
### Criar organização
```graphql
mutation CreateOrganization {
  createOrganization(
    createOrganizationInput: {
      name: "Galactic Air"
      pilots: 12
      flightHours: 3400
      airships: 5
      prompt: "Transportar equipes de manutenção"
      securityObs: "Treinamento de segurança concluído"
      generalObs: "Operação em expansão"
    }
  ) {
    id
    name
    createdAt
  }
}
```

### Listar organizações
```graphql
query GetOrganizations {
  organizations {
    id
    name
    pilots
    flightHours
  }
}
```

### Atualizar organização
```graphql
mutation UpdateOrganization {
  updateOrganization(
    updateOrganizationInput: {
      id: "<UUID>"
      pilots: 18
      generalObs: "Operação internacional"
    }
  ) {
    id
    pilots
    generalObs
    updatedAt
  }
}
```

### Remover organização
```graphql
mutation DeleteOrganization {
  removeOrganization(id: "<UUID>") {
    id
    name
  }
}
```

## Testes e Qualidade
O projeto já vem configurado com Jest, ESLint e Prettier. Utilize os scripts abaixo:

- **Testes unitários**
  ```bash
  npm run test
  ```
- **Cobertura de testes**
  ```bash
  npm run test:cov
  ```
- **Testes end-to-end**
  ```bash
  npm run test:e2e
  ```
- **Lint com correção automática**
  ```bash
  npm run lint
  ```
- **Formatação**
  ```bash
  npm run format
  ```

## Deploy e Produção
1. Configure as variáveis de ambiente (`DATABASE_URL`, e outras que desejar expor).
2. Gere o build com `npm run build`.
3. Execute `node dist/main.js` ou utilize um process manager (PM2, Docker, Kubernetes, etc.).

Graças ao Prisma, o projeto se adapta facilmente a pipelines CI/CD, permitindo migrações controladas (`prisma migrate deploy`) e geração automática do client.

## Recursos Adicionais
- [Documentação do NestJS](https://docs.nestjs.com)
- [Documentação do Prisma](https://www.prisma.io/docs)
- [Referência do Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)

---
Sinta-se à vontade para adaptar este boilerplate às necessidades do seu time. Bons estudos e bons testes! 🚀
