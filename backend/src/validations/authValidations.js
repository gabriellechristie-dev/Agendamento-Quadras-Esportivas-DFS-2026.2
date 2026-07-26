import { z } from "zod";

export const registroSchema = z.object({
  nomeCompleto: z
    .string({ required_error: "O nome completo é obrigatório." })
    .min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z
    .string({ required_error: "O email é obrigatório." })
    .email("Formato de email inválido."),
  telefone: z
    .string({ required_error: "O telefone é obrigatório." })
    .min(10, "Telefone inválido, digite com o DDD."),
  senha: z
    .string({ required_error: "A senha é obrigatória." })
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório." })
    .email("Formato de email inválido."),
  senha: z
    .string({ required_error: "A senha é obrigatória." })
    .min(1, "A senha não pode estar vazia."),
});
