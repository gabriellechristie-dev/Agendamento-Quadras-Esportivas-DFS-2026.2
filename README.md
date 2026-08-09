# ArenaPlay — Frontend

Frontend do **Sistema de Agendamento de Quadras Esportivas** (Projeto DFS-2026.2 —
Atlântico Avanti, curso de Desenvolvimento Full Stack Básico).

Interface para consulta de quadras e realização de reservas de horário, evitando
conflitos de agenda e organizando o uso das quadras.

## Tecnologias utilizadas

- **React 18** (JavaScript, sem TypeScript)
- **Vite** — build tool e dev server
- **React Router DOM** — rotas e navegação
- **Tailwind CSS** — estilização utilitária
- **lucide-react** — ícones

## Como executar

```bash
# instalar dependências
npm install

# iniciar em modo desenvolvimento
npm run dev

# gerar build de produção
npm run build

# pré-visualizar a build de produção
npm run preview
```

O projeto abre em `http://localhost:5173`.

## Estrutura de pastas

```
src/
├── components/
│   ├── layout/     # Navbar, Footer, Layout (estrutura das páginas)
│   ├── ui/          # Badge, StarRating, CourtImage (placeholder visual)
│   ├── home/         # Seções da landing page (Hero, WhyUs, Testimonials...)
│   ├── courts/        # CourtCard, CourtFilters
│   └── booking/        # Seletores de dia/horário (DaySelector, TimeSelector)
├── context/
│   ├── AuthContext.jsx     # Autenticação simulada (login/logout)
│   └── BookingContext.jsx  # Reservas e favoritos do usuário
├── data/
│   ├── courts.js        # Mock de quadras esportivas + horários fechados
│   └── testimonials.js  # Depoimentos exibidos na home
├── pages/
│   ├── Home.jsx              # Landing page
│   ├── Courts.jsx            # Listagem com filtros (esporte, cidade, preço...)
│   ├── CourtDetail.jsx       # Detalhe da quadra + agenda de horários + reserva
│   ├── BookingConfirmed.jsx  # Comprovante da reserva
│   ├── MyBookings.jsx        # Painel do jogador (próximos, histórico, favoritos)
│   ├── Login.jsx / SignUp.jsx
│   └── NotFound.jsx
├── utils/
│   └── formatters.js    # Formatação de preço e datas em pt-BR
├── App.jsx              # Definição das rotas
├── main.jsx             # Ponto de entrada, providers globais
└── index.css             # Diretivas Tailwind + estilos base
```

## Funcionalidades implementadas

- **Landing page** apresentando o sistema e incentivando a prática esportiva.
- **Listagem de quadras** com filtros por esporte, cidade, preço máximo e
  disponibilidade, além de busca por texto.
- **Página de detalhe da quadra** com galeria, comodidades, regras, avaliações e agenda
  de horários (livres/ocupados) por dia.
- **Reserva instantânea**: o usuário escolhe o dia e o horário e clica em "Reservar" —
  a reserva é confirmada na hora, sem etapas extras de pagamento. O horário escolhido
  passa a aparecer como indisponível (riscado) para os próximos acessos àquela quadra,
  naquele dia.
- **Autenticação simulada** (login/criar conta) — necessária apenas para acessar o
  painel "Minhas reservas".
- **Painel do jogador** com próximos jogos, histórico, quadras favoritas e perfil.
- **Layout responsivo**, do mobile ao desktop, com tema único (claro).

## Próximos passos (integração com backend)

Quando a API (Node.js + Express + Prisma + PostgreSQL) estiver disponível, os pontos de
integração já mapeados são:

- `src/data/courts.js` → substituir pelo consumo de `GET /courts`.
- `src/context/BookingContext.jsx` → trocar leitura/escrita em `localStorage` por
  chamadas a `GET/POST/DELETE /bookings`.
- `src/context/AuthContext.jsx` → conectar a um endpoint real de autenticação, se
  implementado.
