# 🚀 Encurtador de URLs Full Stack - DaviShort

Projeto desenvolvido no **Dia 34** da minha jornada de programação. É um encurtador de links funcional que utiliza uma stack moderna para garantir performance e persistência de dados.

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React.js, Axios, Lucide-React (ícones)
- **Backend:** Node.js, Express
- **Banco de Dados:** SQLite (persistência local)
- **ORM:** Prisma v6 (escolhido pela estabilidade e robustez)

## 💡 Desafios Vencidos
Durante o desenvolvimento, enfrentei conflitos de configuração com a versão mais recente do Prisma (v7). Tomei a decisão técnica de utilizar a **versão 6**, priorizando a entrega de um sistema estável e funcional, garantindo que a comunicação entre o schema e o banco de dados SQLite fosse perfeita.

## ⚙️ Como rodar o projeto
1. Clone o repositório.
2. Na pasta `/backend`:
   - Instale as dependências: `npm install`
   - Rode as migrations: `npx prisma migrate dev`
   - Inicie o servidor: `node index.js`
3. Na pasta `/frontend`:
   - Instale as dependências: `npm install`
   - Inicie a interface: `npm run dev`

---
Desenvolvido por **falasembloqueio-create** 👊🔥
