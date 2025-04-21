# Desafio MB Web - Fullstack (Node.js + Vue 3)

Este repositório contém uma aplicação fullstack desenvolvida como parte do desafio técnico para o processo seletivo do **Mercado Bitcoin**. A aplicação é estruturada em **monorepo**, utilizando **Node.js** no backend e **Vue 3 + Vite** no frontend.

---

## Estrutura do Projeto

```
desafio-mb-web
├── apps/
│   ├── api/        # Backend com Node.js + Express
│   └── ui/         # Frontend com Vue 3 + Vite + Storybook
├── docker-compose.yml
├── .scripts/
├── README.md
└── package.json (monorepo com workspaces)
```

---

## Tecnologias Utilizadas

### Backend (apps/api)
- Node.js
- Express
- Vitest
- Arquitetura em camadas: Controllers, UseCases, Entities, Repositories

### Frontend (apps/ui)
- Vue 3
- Vite
- Vitest
- Atomic Design: Atom, Molecule, Organism
- Padrões de clean architecture para use-cases e services
- Storybook

### DevOps
- NPM Workspaces

### Acessos:

- Frontend: http://localhost:8080  
- Backend: http://localhost:3000
- Storybook http://localhost:6006

---

## Como Rodar o Projeto com Docker

### Pré-requisitos
- Docker
- Docker Compose

### Comando para subir os containers:

```bash
docker-compose up --build
```
---

## Como Rodar o Projeto Localmente

### Pré-requisitos
- NodeJS
- NPM

### 1. Instale as dependências:

```bash
npm install
```

### 2. Rodar o Frontend:

```bash
npm run dev:ui
```

### 3. Rodar o Backend:

```bash
npm run dev:api
```

### 4. Rodar os dois juntos:

```bash
npm run dev:all
```

---

## Rodando os Testes

Para rodar os testes automatizados:

```bash
npm run test:all # Testes do frontend e do backend
```

Ou separadamente:

```bash
npm run test:ui     # Testes do frontend
npm run test:api    # Testes do backend
```

---

---

## Rodando o Storybook

Para rodar o storybook:

```bash
npm run dev:storybook 
```


---

## Funcionalidades

- [x] Registro de usuário via formulário multistep
- [x] Validações
- [x] Armazenamento em repositório em memória (mock)
- [x] Separação de responsabilidades (UseCases, Services, Components)
- [x] Testes unitários para helpers e use-cases
- [x] Interface responsiva

---

## 🧹 Scripts Úteis

- `npm run clean`: executa o script `.scripts/clean.sh` para limpar dependências e caches
- `npm run dev:all`: inicia frontend e backend em paralelo
- `npm run test:all`: executa todos os testes das workspaces

