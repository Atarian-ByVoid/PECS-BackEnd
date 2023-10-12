<h1 style="font-family: 'Título';">PECS (Sistema de Comunicação por Troca de Figuras)</h1>
<div style="text-align: center;">
  <img src="img/logo.png" alt="Logo do projeto" style="margin: 0 auto;border-radius:10px">
</div>

# Instalação das dependências do Nest

Para instalar as dependências do Nest, utilize o seguinte comando:

- npm install

Em caso de erro, você pode tentar os seguintes comandos:

    $  npm -i
    $  npm install --force
    $  npm install -force

# Extensões recomendadas para o desenovlimento NestJs

- Git Graph
  Id: mhutchie.git-graph
  Description: View a Git Graph of your repository, and perform Git actions from the graph.
  Version: 1.30.0
  Publisher: mhutchie
  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph

- Docker
  Id: ms-azuretools.vscode-docker
  Description: Makes it easy to create, manage, and debug containerized applications.
  Version: 1.26.0
  Publisher: Microsoft
  VS Marketplace Link: https://marketplace.visualstudio.com/items?ite s-azuretools.vscode-docker

- Prisma
  Id: Prisma.prisma
  Description: Adds syntax highlighting, formatting, auto-completion, jump-to-definition and linting for .prisma files.
  Version: 5.2.0
  Publisher: Prisma
  VS Marketplace Link: https://marketplace.visualstudio.com/items?ite risma.prisma

- Prettier - Code formatter
  Id: esbenp.prettier-vscode
  Description: Code formatter using prettier
  Version: 10.1.0
  Publisher: Prettier
  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

# Comandos para subir as imagens do banco de dados

<div style="text-align: center;">
  <img src="img/docker.png" alt="Logo do projeto" style="margin: 0 auto;border-radius:10px">
</div>

Para subir as imagens do banco de dados, utilize os seguintes comandos:

- sudo docker-compose build postgres pgadmin
- sudo docker-compose up postgres pgadmin

**ATENÇÃO:**

Certifique-se de que o Docker esteja instalado em sua máquina e em execução para subir as imagens dockerizadas.

- Para Windows, você pode instalá-lo [aqui](https://docs.docker.com/desktop/install/windows-install/).
- Para Linux (Ubuntu), você pode instalá-lo [aqui](https://docs.docker.com/engine/install/ubuntu/).

Após subir as imagens acima, o pgAdmin4 estará rodando na seguinte porta:

- [http://localhost:5050](http://localhost:5050)

# Banco de dados

<div style="text-align: center;">
  <img src="img/pgadmin.png" alt="Logo do projeto" style="margin: 0 auto;border-radius:10px">
</div>
Para se conectar ao banco de dados, utilize as seguintes credenciais:

- Email: root@root.com
- Senha: root

Para registrar um servidor no pgAdmin4, siga estes passos:

1. Insira um nome qualquer.
2. Em "Host name/address," coloque o IP local.
3. Nome de usuário: root
4. Senha: root

# CLI Nest

    nest g resource

Comando não só gera todos os blocos de construção NestJS (módulo, serviço, classes de controlador), mas também uma classe de entidade, classes DTO, bem como os arquivos de teste.

    $ nest g controller {nome-qualquer}

Comando para gerar controladores de rotas dentro da aplicação.

    $ nest g service {nome-qualquer}

Comando para gerar serviços, onde serão armazenados nossa regra de negócio.

    $ nest g module {nome-qualquer}

Comando para criar módulos na aplicação com intuito de fornecer comunicação para outras partes do projeto.

## Outro comandos nest g que podem ser usados

> 1. **nest g filter nome-do-filtro**
> 1. **nest g middleware nome-do-middleware**
> 1. **nest g pipe nome-do-pipe**
> 1. **nest g guard nome-do-guarda**
> 1. **nest g interceptor nome-do-interceptor**
> 1. **nest g decorator nome-do-decorador**

# Comandos para rodar a aplicação NestJs

### Modo de Desenvolvimento com Observação (Watch Mode)

    $  npm run start:dev

### Modo de Produção

    $  npm run start:prod

### Testes Unitários

    $  npm run test

### Testes de Integração (e2e)

    $  npm run test:e2e

### Cobertura de Testes

    $  npm run test:cov

# Swagger

<div style="text-align: center;">
  <img src="img/swagger.png" alt="Logo do projeto" style="margin: 0 auto;border-radius:10px">
</div>
O Swagger é uma ferramenta que ajuda a documentar APIs de forma automática e também permite testar e interagir com essas APIs de forma interativa. No contexto do NestJS, uma estrutura de aplicativo Node.js para construir aplicativos da web e API, você pode usar o Swagger para documentar suas APIs de forma fácil e eficaz.

Com a aplicação rodando, o swagger estará rodando na seguinte porta:

- [Porta Swagger: localhost:3000](http://localhost:3000/api)

  ### Instalação das dependências:

-     npm install --save @nestjs/swagger swagger-ui-express

## Um pouco sobre suas tags

@ApiTags:

Esta tag é usada para agrupar endpoints relacionados sob um mesmo rótulo na documentação Swagger. Isso ajuda a organizar a documentação e facilita a navegação.

Por exemplo:

```ts
@Controller('exemplo')
@ApiTags('Exemplo')
export class ExemploController {
  // ...
}
```

@ApiOperation:

Esta tag é usada para documentar uma operação (ou endpoint) em um controlador. Ela fornece detalhes sobre o que a operação faz, como parâmetros e respostas esperadas.

Por exemplo:

```ts
@Get()
@ApiOperation({ summary: 'Obter todos os exemplos' })
findAll(): string[] {
  // ...
}
```

@ApiProperty:

Esta tag é usada para documentar propriedades em um DTO (Objeto de Transferência de Dados) ou em uma classe. Ela fornece informações sobre a propriedade, como exemplos e descrição.

Por exemplo:

```ts
export class ExemploDto {
  @ApiProperty({ example: 'exemplo1', description: 'Nome do exemplo' })
  nome: string;

  @ApiProperty({ example: 25, description: 'Idade do exemplo' })
  idade: number;
}
```

@ApiResponse:

Esta tag é usada para documentar as respostas de uma operação. Ela permite especificar o status HTTP e a descrição da resposta.

Por exemplo:

```ts
@Get(':id')
@ApiOperation({ summary: 'Obter um exemplo por ID' })
@ApiResponse({ status: 200, description: 'Exemplo encontrado' })
@ApiResponse({ status: 404, description: 'Exemplo não encontrado' })
findById(@Param('id') id: string): string {
  // ...
}
```

# Entendendo o Prisma

Após todo o processo de configuração do banco e com a aplicação rodando, já podemos adicionar tabelas em nosso banco de dados atraves do Prisma, a seguir um tutorial pratico de como fazer isso

### Instale a CLI do NestJs

-     $ npm install -g @nestjs/cli
-     $ nest new hello-prisma

### Configure o Prisma no projeto

-     $ cd hello-prisma
-     $ npm install prisma --save-dev

### Invoque a CLI do Prisma

-     $ npx prisma

### Crie o diretório Prisma, onde serão armazenadas as tabelas

-     $ npx prisma init

**ATENÇÃO:**

<div style="text-align: center;">
  <p  style="margin: 0 auto;border-radius:10px; font-weight: bold">Todas as vezes que forem criadas tabelas novas no banco ou as mesmas existentes forem modificadas, é necessário invocar o seguinte comando:</p>
</div>

-     $ npx prisma migrate dev --name init

## Modelo de tabelas no Prisma

```prisma
model User {
  id       Int      @id @default(autoincrement())
  name     String
  email    String   @unique
  posts    Post[]
}

```

# Hello World ;)

```ts
function sayHello(name: string): string {
  return `Hello, ${name}!`;
}

const message = sayHello('World');
console.log(message);
```

# Criando meu primeiro CRUD em NestJS 🦁

<div style="text-align: center;">
  <img src="img/nest.svg" alt="Logo do projeto" style="margin: 0 auto;border-radius:10px">
</div>

### Criando um projeto do zero em NestJS [aqui](https://www.treinaweb.com.br/blog/criando-o-primeiro-crud-com-nestjs)

# Seeds no projeto
Para facilitar o desenvolvimento e testes manuais das funcionalidades do sistema, foi criado seeders com intuito de popular o banco de dados para manipularmos nossas entidades com maior facilidade.

#### Comando para rodar a seed: 
-     $ npx ts-node usuario.seeds.ts
Cerifique-se que você esteja dentro da pasta seeds "src/seeds", só então abra o terminal dentro dela e execute o comando acima.
# Integração com AWS

<div style="text-align: center;">
  <img src="img/aws-logo.png" alt="Logo do projeto" style="margin: 0 auto;border-radius:10px; height: 250px">
</div>

A Amazon Web Services (AWS) é uma plataforma de computação em nuvem que fornece uma ampla gama de serviços, incluindo poder de computação, armazenamento de banco de dados, entrega de conteúdo e muito mais. A AWS oferece mais de 150 serviços que podem ser usados para criar aplicativos sofisticados com maior flexibilidade, escalabilidade e confiabilidade. A AWS é amplamente utilizada por empresas e indivíduos por sua relação custo-benefício, segurança e facilidade de uso.

## Serviços da AWS

- Amazon SQS (Simple Queue Service): É um serviço de fila de mensagens para comunicação assíncrona entre componentes de aplicativos.

- Amazon SES (Simple Email Service): É um serviço de envio de e-mails em larga escala, útil para e-mails transacionais e de marketing.

- Amazon SNS (Simple Notification Service): É um serviço de notificação que permite enviar mensagens para diferentes destinos, como aplicativos móveis e e-mails.

- Amazon RDS (Relational Database Service): É um serviço de banco de dados relacional totalmente gerenciado que suporta várias opções de banco de dados.

- Amazon S3 (Simple Storage Service): É um serviço de armazenamento em nuvem escalável e durável, usado para armazenar e recuperar dados, como arquivos, imagens e vídeos.

# Padrão de commits

| Tipo de commit                  | Emojis                |
| ------------------------------- | --------------------- |
| Commit inicial                  | 🎉 :tada:             |
| Tag de versão                   | 🔖 :bookmark:         |
| Novo recurso                    | ✨ :sparkles:         |
| Lista de ideias (tasks)         | 🔜 :soon:             |
| Bugfix                          | 🐛 :bug:              |
| Documentação                    | 📚 :books:            |
| Testes                          | 🧪 :test_tube:        |
| Adicionando um teste            | ✅ :white_check_mark: |
| Teste de aprovação              | ✔️ :heavy_check_mark: |
| Acessibilidade                  | ♿ :wheelchair:       |
| Texto                           | 📝 :pencil:           |
| Package.json em JS              | 📦 :package:          |
| Em progresso                    | 🚧 :construction:     |
| Arquivos de configuração        | 🔧 :wrench:           |
| Removendo uma dependência       | ➖ :heavy_minus_sign: |
| Adicionando uma dependência     | ➕ :heavy_plus_sign:  |
| Revertendo mudanças             | 💥 :boom:             |
| Alterações de revisão de código | 👌 :ok_hand:          |
| Refatoração                     | ♻️ :recycle:          |
| Mover/Renomear                  | 🚚 :truck:            |

## Exemplo prático

```ts
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
```

O codigo acima ainda não está pronto, por tanto usamos o seguinte padrão de commit:

-     🚧 :construction:

# O caminho para glória REST-Full ✨

- **Stateless**: Cada solicitação contém todas as informações necessárias.
- **Recursos**: Recursos são identificados por URIs.
- **Representações**: Recursos têm várias representações (JSON, XML, etc.).
- **Métodos HTTP**: Métodos (GET, POST, PUT, DELETE) operam em recursos.
- **Idempotência**: Operações podem ser repetidas sem efeito.
- **HATEOAS**: Respostas incluem links para recursos relacionados.
- **Camadas**: Divide a aplicação em camadas.
- **Cache**: Possibilidade de armazenar em cache respostas.
- **Código sob Demanda** (opcional): Enviar código executável para o cliente.
- **Manipulação Uniforme**: Seguir convenções uniformes para recursos e interações.

# CleanCode

<div style="text-align: center;">
  <img src="img/clean.jpeg" alt="Logo do projeto" style="margin: 0 auto;border-radius:10px; height: 250px">
</div>

- **Nomes Descritivos**: Escolha nomes claros e significativos.
- **Funções Pequenas**: Mantenha funções curtas e focadas.
- **Comentários Úteis**: Explique o "porquê", não apenas o "o quê".
- **Evite Código Morto**: Remova código não utilizado.
- **Padrões de Indentação**: Siga um padrão consistente.
- **Evite Efeitos Colaterais**: Evite ações inesperadas.
- **Limite Parâmetros**: Evite muitos parâmetros.
- **Convenções de Nomenclatura**: Siga as convenções da linguagem.
- **Testes Unitários**: Escreva testes para verificar comportamento.
- **Divisão de Responsabilidades**: Mantenha funções/classes com uma única responsabilidade.
- **Evite Aninhamento Excessivo**: Evite estruturas profundamente aninhadas.
- **Documentação Adequada**: Documente seu código.
- **Refatoração Constante**: Esteja disposto a melhorar o código.
- **Compreensão do Domínio**: Entenda o domínio do problema.
- **Revisões de Código**: Faça revisões com colegas.

# Time de desenvolvimento

| Nome               | Função            |
| :----------------- | :---------------- |
| **Carlos Alberto** | _BackEnd/Suporte_ |
| **Henrique**       | _Suporte_         |
| **Miguel Vilela**  | _BackEnd_         |
| **Alexandre**      | _Backend_         |
| **Luana**          | _BackEnd_         |
| **Ingrid**         | _BackEnd_         |
| **Wembley**        | _BackEnd_         |
| **Cauan**          | _BackEnd_         |

# Referências

- Prisma - ORM para Node.js e TypeScript [aqui](https://www.prisma.io/)
- NestJS Prisma Recipe - Integração do Prisma com NestJS [aqui](https://docs.nestjs.com/recipes/prisma)
- NestJS - Framework para construção de aplicações escaláveis com Node.js [aqui](https://nestjs.com/)
- Transtorno - Artigo do Núcleo do Conhecimento sobre transtornos psicológicos [aqui](https://www.nucleodoconhecimento.com.br/psicologia/transtorno)
- Como criar uma CRUD usando Prisma [aqui](https://prensa.li/prensa/como-criar-um-sistema-crud-com-o-prisma/)
