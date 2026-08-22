import arenaCentral from "../assets/courts/quadrafutsal.jpg";
import arenaCentral2 from "../assets/courts/quadrafutsal2.jpg";
import arenaCentral3 from "../assets/courts/quadrafutsal3.jpg";
import arenaGreenField from "../assets/courts/quadrasociety.jpg";
import arenaGreenField2 from "../assets/courts/quadrasociety2.jpg";
import arenaGreenField3 from "../assets/courts/quadrasociety3.jpg";
import quadraBasquete from "../assets/courts/quadrabasquete.jpg";
import quadraBasquete2 from "../assets/courts/quadrabasquete2.jpg";
import quadraBasquete3 from "../assets/courts/quadrabasquete3.jpeg";
import quadraBeachTennis from "../assets/courts/quadrabeachtennis.webp";
import quadraBeachTennis2 from "../assets/courts/quadrabeachtennis2.webp";
import quadraBeachTennis3 from "../assets/courts/quadrabeachtennis3.jpg";
import quadraTenis from "../assets/courts/quadratenis.png";
import quadraTenis2 from "../assets/courts/quadratenis2.jpg";
import quadraTenis3 from "../assets/courts/quadratenis3.jpg";
import quadraVoleiAreia from "../assets/courts/quadravoleiareia.jpg";
import quadraVoleiAreia2 from "../assets/courts/quadravoleiareia2.jpg";
import quadraVoleiAreia3 from "../assets/courts/quadravoleiareia3.jpg";

export const SPORTS = [
  "Futsal",
  "Society",
  "Beach Tennis",
  "Tênis",
  "Basquete",
  "Vôlei de Areia",
];

export const CITIES = ["São Paulo", "Santos", "Campinas"];

export const TIME_SLOTS = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 7;
  return `${String(hour).padStart(2, "0")}:00`;
});

export const courts = [
  {
    id: 1,
    name: "Arena Central — Quadra 1",
    sport: "Futsal",
    neighborhood: "Pinheiros",
    city: "São Paulo",
    pricePerHour: 120,
    rating: 4.9,
    reviewCount: 214,
    availableNow: true,
    image: arenaCentral,
    image2: arenaCentral2,
    image3: arenaCentral3,
    description:
      "Quadra coberta de futsal com piso profissional, iluminação LED e vestiários completos. Ideal para jogos noturnos e campeonatos internos.",
    amenities: ["Coberta", "Vestiário", "Estacionamento", "Iluminação LED"],
    openingHours: "06:00 às 23:00",
    rules: [
      "Uso obrigatório de tênis de futsal (sem travas)",
      "Tolerância de 10 minutos após o horário reservado",
      "Cancelamento gratuito até 12h antes",
      "Proibido bebidas alcoólicas dentro da quadra",
    ],
    reviews: [
      {
        name: "Marina Costa",
        sport: "Futsal",
        rating: 5,
        comment:
          "Reservei em menos de um minuto e a quadra estava impecável. Virou nosso ponto fixo de sábado.",
      },
      {
        name: "Diego Almeida",
        sport: "Futsal",
        rating: 5,
        comment:
          "O calendário de disponibilidade salva o grupo. Ninguém mais fica ligando pra confirmar horário.",
      },
    ],
  },
  {
    id: 2,
    name: "Green Field Society",
    sport: "Society",
    neighborhood: "Vila Mariana",
    city: "São Paulo",
    pricePerHour: 160,
    rating: 4.8,
    reviewCount: 178,
    availableNow: true,
    image: arenaGreenField,
    image2: arenaGreenField2,
    image3: arenaGreenField3,
    description:
      "Campo society com grama sintética de última geração, traves oficiais e refletores para partidas noturnas.",
    amenities: ["Grama sintética", "Vestiário", "Estacionamento", "Refletores"],
    openingHours: "07:00 às 23:00",
    rules: [
      "Uso obrigatório de chuteira society (sem trava de ferro)",
      "Tolerância de 10 minutos após o horário reservado",
      "Cancelamento gratuito até 12h antes",
      "Máximo de 14 jogadores por reserva",
    ],
    reviews: [
      {
        name: "Rafael Lima",
        sport: "Society",
        rating: 4,
        comment:
          "Preço transparente, sem surpresa na hora de pagar. Cancelamento simples quando precisei.",
      },
    ],
  },
  {
    id: 3,
    name: "Sunset Beach Arena",
    sport: "Beach Tennis",
    neighborhood: "Gonzaga",
    city: "Santos",
    pricePerHour: 90,
    rating: 4.7,
    reviewCount: 96,
    availableNow: true,
    image: quadraBeachTennis,
    image2: quadraBeachTennis2,
    image3: quadraBeachTennis3,
    description:
      "Arena de areia à beira-mar, com rede profissional e vista para o litoral santista. Perfeita para o fim de tarde.",
    amenities: ["Areia importada", "Chuveiro", "Bar", "Vista para o mar"],
    openingHours: "08:00 às 22:00",
    rules: [
      "Uso de óculos de sol recomendado após 16h",
      "Tolerância de 10 minutos após o horário reservado",
      "Cancelamento gratuito até 6h antes",
    ],
    reviews: [
      {
        name: "Marina Costa",
        sport: "Beach Tennis",
        rating: 5,
        comment:
          "Reservei em menos de um minuto e a quadra estava impecável. Virou nosso ponto fixo de sábado.",
      },
    ],
  },
  {
    id: 4,
    name: "Match Point Tênis",
    sport: "Tênis",
    neighborhood: "Cambuí",
    city: "Campinas",
    pricePerHour: 110,
    rating: 4.6,
    reviewCount: 64,
    availableNow: true,
    image: quadraTenis,
    image2: quadraTenis2,
    image3: quadraTenis3,
    description:
      "Quadra de saibro sintético com iluminação para jogos noturnos e arquibancada para acompanhantes.",
    amenities: [
      "Saibro sintético",
      "Vestiário",
      "Arquibancada",
      "Iluminação LED",
    ],
    openingHours: "06:00 às 22:00",
    rules: [
      "Uso obrigatório de tênis específico para saibro",
      "Tolerância de 10 minutos após o horário reservado",
      "Cancelamento gratuito até 12h antes",
    ],
    reviews: [],
  },
  {
    id: 5,
    name: "Urban Hoops Rooftop",
    sport: "Basquete",
    neighborhood: "Itaim Bibi",
    city: "São Paulo",
    pricePerHour: 100,
    rating: 4.8,
    reviewCount: 142,
    availableNow: true,
    image: quadraBasquete,
    image2: quadraBasquete2,
    image3: quadraBasquete3,
    description:
      "Quadra de basquete no rooftop com vista panorâmica da cidade, piso emborrachado e tabelas profissionais.",
    amenities: ["Piso emborrachado", "Vista panorâmica", "Iluminação LED"],
    openingHours: "07:00 às 23:00",
    rules: [
      "Uso obrigatório de tênis próprio para quadra (sem sola preta)",
      "Tolerância de 10 minutos após o horário reservado",
      "Cancelamento gratuito até 12h antes",
    ],
    reviews: [],
  },
  {
    id: 6,
    name: "Arena Vôlei de Areia",
    sport: "Vôlei de Areia",
    neighborhood: "Ponta da Praia",
    city: "Santos",
    pricePerHour: 80,
    rating: 4.5,
    reviewCount: 58,
    availableNow: true,
    image: quadraVoleiAreia,
    image2: quadraVoleiAreia2,
    image3: quadraVoleiAreia3,
    description:
      "Quadra de vôlei de praia com areia nivelada semanalmente e rede oficial, a poucos passos da orla.",
    amenities: ["Areia nivelada", "Chuveiro", "Estacionamento"],
    openingHours: "08:00 às 21:00",
    rules: [
      "Tolerância de 10 minutos após o horário reservado",
      "Cancelamento gratuito até 6h antes",
      "Proibido bebidas alcoólicas dentro da quadra",
    ],
    reviews: [],
  },
];

export function getCourtById(id) {
  return courts.find((court) => String(court.id) === String(id));
}

export function getClosedSlots(courtId, dateISO) {
  const seed =
    Number(courtId) +
    dateISO.split("-").reduce((total, part) => total + Number(part), 0);
  return TIME_SLOTS.filter((_, index) => (seed + index) % 6 === 0);
}
