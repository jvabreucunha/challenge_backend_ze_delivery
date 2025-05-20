# Challenge Backend Zé Delivery

API para gestão de parceiros com geolocalização usando PostgreSQL + PostGIS

## 🌍 Visão Geral
Solução completa para os requisitos do desafio utilizando:
- **PostgreSQL** com extensão **PostGIS** para operações geoespaciais
- Índices GiST para consultas otimizadas
- Validação de geometrias no banco de dados

## 🛠 Stack Tecnológica
- **Node.js 18** + **Express**
- **PostgreSQL 15** + **PostGIS 3.3**
- **Jest** + **Supertest** (Testes)
- **Docker** + **Docker Compose**
- **ESLint** + **Prettier**

## ✅ Implementação PostGIS
```sql
-- Exemplo de tabela com tipos geoespaciais
CREATE TABLE partners (
    id UUID PRIMARY KEY,
    document VARCHAR(20) UNIQUE,
    trading_name VARCHAR(255),
    owner_name VARCHAR(255),
    coverage_area GEOMETRY(MultiPolygon, 4326),
    address GEOMETRY(Point, 4326)
);

-- Índice espacial para consultas rápidas
CREATE INDEX idx_coverage_area ON partners USING GIST (coverage_area);
CREATE INDEX idx_address ON partners USING GIST (address);
