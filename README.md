# Aviation AI API - Sparring

Backend Sparring é uma API GraphQL construída com Node.js e NestJS que utiliza TypeScript, Prisma ORM e PostgreSQL para oferecer uma base sólida de gestão de organizações aeronáuticas fictícias. O projeto foi pensado para servir como material de estudo e experimentação, demonstrando boas práticas de arquitetura, camadas bem definidas e integração com um banco relacional moderno.

## Visão Geral da Aplicação
- **API**: GraphQL exposta via Apollo Server, com _playground_ habilitado para facilitar inspeção e testes.
- **Framework**: NestJS 10, explorando módulos, injeção de dependências, _providers_ e resolvers.
- **ORM**: Prisma Client, responsável pelo acesso ao banco PostgreSQL e pela geração de tipos fortemente tipados.
- **Banco de dados**: PostgreSQL, definido através do arquivo `prisma/schema.prisma` e configurado via variável `DATABASE_URL`.
- **Domínio principal**: CRUD completo para entidades de **Organização**, incluindo campos de métricas operacionais e observações.

## Deploy e Produção
API em produção: http://54.164.151.205:3000/graphql

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
