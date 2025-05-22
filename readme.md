# Challenge Backend Zé Delivery

API para gestão de parceiros com geolocalização, desenvolvida como parte do desafio de backend do Zé Delivery.

## 🧭 Visão Geral
Esta aplicação oferece uma API RESTful para:

- Cadastro de parceiros com informações geoespaciais.
- Consulta de todos os parceiros cadastrados.
- Busca de parceiro por ID.
- Busca do parceiro mais próximo a uma coordenada geográfica.

## 🌍 Visão Geral
Solução completa para os requisitos do desafio utilizando:
- **PostgreSQL** com extensão **PostGIS** para operações geoespaciais
- Índices GiST para consultas otimizadas
- Validação de geometrias no banco de dados

## 🧰 Stack Tecnológica
Linguagem: Node.js com TypeScript

- Framework: Express
- Banco de Dados: PostgreSQL com extensão PostGIS
- Containerização: Docker
- Balanceamento de Carga: Nginx com Round Robin
- Testes: Jest


## 📦 Endpoints

### Criar Parceiro
- Rota: POST /stores
- Descrição: Cadastra um novo parceiro.

Body Exemplo:
``` json
{
  "id": "51",
  "tradingName": "Adega do Joao",
  "ownerName": "Pele Maradona",
  "document": "96036150644",
  "coverageArea": {
    "type": "MultiPolygon",
    "coordinates": [[[[-44.04912, -19.87743], [-44.0493, -19.89438], [-44.04758, -19.90212], [-44.04346, -19.90922], [-44.03385, -19.91923], [-44.01891, -19.92165], [-44.01647, -19.92306], [-44.01436, -19.92319], [-44.01175, -19.92427], [-44.00724, -19.92585], [-43.99909, -19.9185], [-43.99432, -19.91403], [-43.99557, -19.90842], [-43.99582, -19.90285], [-43.99436, -19.89002], [-43.99316, -19.8792], [-43.99436, -19.87371], [-43.99951, -19.86532], [-44.01917, -19.85135], [-44.02801, -19.8545], [-44.03745, -19.85668], [-44.04397, -19.8608], [-44.04912, -19.87743]]]]
  },
  "address": {
    "type": "Point",
    "coordinates": [-44.012478, -19.887215]
  }
}
```

#### Respostas:

- 201 Created: Parceiro cadastrado com sucesso.
- 400 Bad Request: Dados inválidos ou formato incorreto.
---
### Listar Todos os Parceiros
- Rota: GET /stores
- Descrição: Retorna uma lista de todos os parceiros cadastrados.

#### Respostas:

- 200 OK: Lista de parceiros.
- 500 Internal Server Error: Erro ao recuperar os dados.
---

### Listar Todos os Parceiros
- Rota: GET /stores
- Descrição: Retorna uma lista de todos os parceiros cadastrados.

#### Respostas:

- 200 OK: Lista de parceiros.
- 500 Internal Server Error: Erro ao recuperar os dados.
---

### Buscar Parceiro por ID
- Rota: GET /stores/:id
- Descrição: Retorna os dados de um parceiro específico pelo ID.
- Parâmetros: id: ID do parceiro.

#### Respostas:

- 200 OK: Dados do parceiro.
- 404 Not Found: Parceiro não encontrado.
---

### Buscar Parceiro Mais Próximo
- Rota: POST /stores/search
- Descrição: Retorna o parceiro mais próximo de uma coordenada geográfica fornecida.

Body Exemplo:
``` json
{
    "lng": -44.012478,
    "lat": -19.887215
}
```

#### Respostas:
Respostas:

-   200 OK: Dados do parceiro mais próximo.
-   400 Bad Request: Coordenadas inválidas.
-   404 Not Found: Nenhum parceiro encontrado na área.
-   422 Coordenadas devem ser números
---

## 🐳 Docker e Nginx
O projeto utiliza Docker para containerização e Nginx para balanceamento de carga entre múltiplas instâncias da aplicação, implementando o algoritmo Round Robin para distribuição de requisições.

## 🚀 Como Executar

### 1. Clone o repositório:

``` bash
    git clone https://github.com/jvabreucunha/challenge_backend_ze_delivery.git
    cd challenge_backend_ze_delivery
```

### 2. Configure as variáveis de ambiente:

Crie um arquivo .env com base no .env.example fornecido.

#### Rodar localmnente:

``` bash
    docker-compose up --build
```

#### 📦 Setup do Banco de Dados

Se esta for a **primeira vez** rodando o projeto, ou se o banco de dados ainda **não possui as tabelas criadas**, você precisará executar as **migrations** para preparar a estrutura do banco.
---

#### 🧱 Rodando as Migrations

> ⚠️ **Importante:** Este passo é necessário apenas se o banco estiver **vazio** (sem as tabelas criadas).

1. Certifique-se de que o banco de dados está rodando (ex: **PostgreSQL com PostGIS**).
2. Verifique se o Docker está ativo com o comando:.
```bash
    # Verifica os containers em execução
   docker ps

   # Se o banco não estiver rodando, inicie os serviços
    docker-compose up -d
```
3. Execute o seguinte comando:

```bash
npm run migrate
```

Acesse a aplicação:

A API estará disponível em http://localhost:80.

## ✅ Aplicação pronta para uso

Com as migrations aplicadas corretamente, a estrutura do banco estará pronta e a aplicação poderá ser executada normalmente.

🔗 **A API estará disponível no seguinte endereço:**
[http://localhost:80](http://localhost:80)

A partir deste ponto, é possível testar as rotas disponíveis e utilizar os recursos da aplicação conforme documentado.
