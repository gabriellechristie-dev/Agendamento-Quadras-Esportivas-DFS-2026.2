import { z } from "zod";

export const criarQuadraSchema = z.object({
  nome: z
    .string({ required_error: "O nome da quadra é obrigatório." })
    .min(3, "O nome da quadra deve ter no mínimo 3 caracteres."),

  modalidade: z
    .string({ required_error: "A modalidade esportiva é obrigatória." })
    .min(
      3,
      "A modalidade deve ter no mínimo 3 caracteres (ex: Vôlei, Futebol).",
    ),

  localizacao: z
    .string({ required_error: "A localização é obrigatória." })
    .min(5, "Forneça uma localização mais detalhada."),
});

export const atualizarQuadraSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome da quadra deve ter no mínimo 3 caracteres.")
    .optional(),

  modalidade: z
    .string()
    .min(3, "A modalidade deve ter no mínimo 3 caracteres.")
    .optional(),

  localizacao: z
    .string()
    .min(5, "Forneça uma localização mais detalhada.")
    .optional(),
});
