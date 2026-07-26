import { z } from "zod";

export const criarReservaSchema = z.object({
  dataHora: z
    .string({ required_error: "A data/hora é obrigatória." })
    .datetime("Envie uma data no formato ISO válido."),
  duracao: z.number().min(30, "A duração mínima é de 30 minutos.").default(60),
  quadraId: z
    .string({ required_error: "O ID da quadra é obrigatório." })
    .uuid("ID da quadra deve ser um UUID válido."),
  jogadorId: z
    .string()
    .uuid("ID do jogador deve ser um UUID válido.")
    .optional(),
});
