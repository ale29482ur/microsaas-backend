
/**
 * ErrorHandler
 *
 * Middleware global responsável por capturar os erros
 * encaminhados pelo Express e transformá-los em respostas HTTP.
 *
 * Recebe erros personalizados (AppError) e erros inesperados,
 * definindo o status HTTP e a mensagem adequada para cada situação.
 */
export function ErrorHandler(error, req, res, next) {

    // Utiliza o statusCode do erro ou 500 caso não exista.
    const statusCode = error.statusCode || 500;

    // Retorna a resposta HTTP com o status e a mensagem do erro.
    return res.status(statusCode).json({

        // Evita expor detalhes internos em erros inesperados (500).
        // Para erros personalizados, retorna a mensagem definida no AppError.
        message: statusCode === 500
            ? "Erro interno do servidor."
            : error.message
    });
}
