export const validarSchema = (schema) => (request, response, next) => {
  try {
    schema.parse(request.body);
    next();
  } catch (error) {
    if (error.errors) {
      const errosFormatados = error.errors.map((err) => ({
        campo: err.path.join("."),
        mensagem: err.message,
      }));

      return response.status(400).json({
        mensagem: "Dados inválidos fornecidos na requisição.",
        erros: errosFormatados,
      });
    }

    console.error("Erro interno no middleware de validação:", error);
    return response.status(500).json({
      mensagem: "Erro interno no servidor ao tentar validar os dados.",
      detalhes: error.message,
    });
  }
};
