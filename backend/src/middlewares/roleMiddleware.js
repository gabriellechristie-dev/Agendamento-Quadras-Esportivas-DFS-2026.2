export const permitirTipos = (...tiposPermitidos) => {

    return (request, response, next) => {

        const tipoUsuario = request.usuario.tipo;

        if (!tiposPermitidos.includes(tipoUsuario)) {
            return response.status(403).json({
                mensagem: "Você não possui permissão para acessar esta rota!"
            });
        }

        next();
    };
};