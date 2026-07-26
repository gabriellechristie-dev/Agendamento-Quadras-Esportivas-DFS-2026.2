import { z } from "zod";

export const criarQuadraSchema = z.object({
  body: z.object({
    nome: z
      .string({ required_error: "O nome da quadra é obrigatório." })
      .min(3, "O nome deve ter no mínimo 3 caracteres."),
    modalidade: z
      .string({ required_error: "A modalidade é obrigatória." })
      .min(2, "A modalidade deve ser informada (ex: Futebol, Vôlei)."),
    localizacao: z.string({ required_error: "A localização é obrigatória." }),
    status: z
      .enum(["DISPONIVEL", "INDISPONIVEL"], {
        invalid_type_error: "Status inválido. Use DISPONIVEL ou INDISPONIVEL.",
      })
      .optional()
      .default("DISPONIVEL"),
  }),
});

export const atualizarQuadraSchema = z.object({
  body: z.object({
    nome: z.string().min(3).optional(),
    modalidade: z.string().optional(),
    localizacao: z.string().optional(),
    status: z.enum(["DISPONIVEL", "INDISPONIVEL"]).optional(),
  }),
});
