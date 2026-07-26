export const errorHandler = (error, request, response, next) => {
  console.error("Erro capturado pelo Middleware Global:", error);

  // 1. Tratamento de Erros do Prisma
  if (error.code === "P2002") {
    return response.status(409).json({
      mensagem:
        "Conflito de dados: Este registro (ou e-mail/campo único) já existe no sistema.",
    });
  }

  if (error.code === "P2025") {
    return response.status(404).json({
      mensagem: "Registro não encontrado no banco de dados.",
    });
  }

  if (error.code === "P2003") {
    return response.status(400).json({
      mensagem:
        "Operação negada: existem registros dependentes vinculados a este item.",
    });
  }

  if (error.status && error.message) {
    return response.status(error.status).json({
      mensagem: error.message,
    });
  }

  const errosConhecidos = {
    "Horário indisponível para esta quadra.": 400,
    "Não é possível criar uma reserva no passado.": 400,
    "O horário de término deve ser posterior ao início.": 400,
    "A quadra informada não existe.": 404,
    "A quadra selecionada não está disponível no momento.": 400,
  };

  if (errosConhecidos[error.message]) {
    return response.status(errosConhecidos[error.message]).json({
      mensagem: error.message,
    });
  }

  return response.status(500).json({
    mensagem: "Erro interno do servidor.",
    detalhe: error.message,
  });
};
