import { z } from "zod";

export const registroSchema = z.object({
  nomeCompleto: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  email: z.string().email("Formato de e-mail inválido."),
  telefone: z.string().min(10, "O telefone deve ter no mínimo 10 dígitos."),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export const loginSchema = z.object({
  email: z.string().email("Formato de e-mail inválido."),
  senha: z.string().min(1, "A senha é obrigatória."),
});
