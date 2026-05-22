# MyLibrary — Sistema de Biblioteca Pessoal

Sistema fullstack para gerenciamento de biblioteca pessoal: cadastro de livros por categorias, controle de empréstimos e devoluções com histórico completo.

Desenvolvido como projeto integrado das disciplinas **Construção de Software** e **Gerência de Configuração de Software** — Faculdade SENAI.

---

## Stack tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Backend | Spring Boot 3.1.4 · Java 17 · H2 (in-memory) · JPA/Hibernate · Bean Validation |
| Frontend | Angular 17+ · Standalone Components · Reactive Forms |
| CI | GitHub Actions (build backend + frontend em cada PR) |
| Versionamento | Git · GitHub (Issues, PRs, Releases, Tags) |

---

## Como executar

### Pré-requisitos

- Java 17+
- Maven 3.8+
- Node.js 20+ e npm

### Backend

```bash
cd backend
mvn spring-boot:run
```

O backend sobe em `http://localhost:8080`.  
Console H2 disponível em `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:mylibrary`).  
Documentação Swagger em `http://localhost:8080/swagger-ui.html`.

### Frontend

```bash
cd frontend
npm install
npm start
```

O frontend sobe em `http://localhost:4200` com proxy para o backend configurado em `src/proxy.conf.json`.

---

## Endpoints da API

### Categorias
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/categorias` | Listar todas as categorias |
| POST | `/api/categorias` | Criar nova categoria |
| DELETE | `/api/categorias/{id}` | Excluir categoria (bloqueia se houver livros) |

### Livros
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/livros?categoriaId=&status=&q=` | Listar livros com filtros opcionais |
| GET | `/api/livros/{id}` | Buscar livro por ID |
| POST | `/api/livros` | Cadastrar novo livro |
| DELETE | `/api/livros/{id}` | Excluir livro (apenas se DISPONIVEL) |

### Empréstimos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/emprestimos` | Listar todos os empréstimos |
| GET | `/api/emprestimos/ativos` | Listar empréstimos não devolvidos |
| GET | `/api/emprestimos/atrasados` | Listar empréstimos com devolução vencida |
| GET | `/api/emprestimos/livro/{livroId}` | Histórico de empréstimos de um livro |
| POST | `/api/emprestimos/emprestar?livroId=` | Registrar empréstimo |
| POST | `/api/emprestimos/{id}/devolver` | Registrar devolução |

### Dashboard
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/dashboard` | Estatísticas gerais do acervo |

---

## Regras de negócio

- **RN01** — Nome de categoria deve ser único
- **RN02** — Não é permitido excluir categoria com livros vinculados
- **RN03** — Status inicial de todo livro é `DISPONIVEL`
- **RN04** — Só é possível excluir livro com status `DISPONIVEL`
- **RN05** — Ao emprestar: status do livro muda para `EMPRESTADO`
- **RN06** — Ao devolver: status do livro muda para `DISPONIVEL`
- **RN07** — Não é permitido emprestar livro já emprestado
- **RN08** — Empréstimo atrasado = `dataDevolucaoPrevista < hoje` e `dataDevolucaoEfetiva` é nula

---

## Rastreabilidade GCS

| Requisito | Issue | Branch | Release |
|-----------|-------|--------|---------|
| RF01 — CRUD Categorias | #1 | `feature/crud-categorias` | v1.0.0 |
| RF02 — CRUD Livros | #2 | `feature/crud-livros` | v1.0.0 |
| RF03 — Empréstimos | #3 | `feature/emprestimos` | v1.0.0 |
| Bug: validação exclusão | #4 | `hotfix/validacao-exclusao` | v1.0.1 |

---

## Histórico de versões

Veja [CHANGELOG.md](./CHANGELOG.md) para o histórico completo de mudanças.

---

*Prof. Esp. Jonatas Edward Dias de Oliveira — Faculdade SENAI*
