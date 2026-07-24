import jwt from "jsonwebtoken";

export const autenticarUsuario = (request, response, next) => {

    const authorization = request.headers.authorization;

    if (!authorization) {
        return response.status(401).json({
            mensagem: "Token não informado!"
        });
    }

    const partes = authorization.split(" ");

    if (partes.length !== 2 || partes[0] !== "Bearer") {
        return response.status(401).json({
            mensagem: "Formato do token inválido!"
        });
    }

    const token = partes[1];

    try {

        const usuarioAutenticado = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        request.usuario = usuarioAutenticado;

        next();

    } catch (error) {

        return response.status(401).json({
            mensagem: "Token inválido ou expirado!"
        });

    }
};