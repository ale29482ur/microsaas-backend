
/**
 * AppError
 *
 * Classe responsável por criar erros personalizados
 * na aplicação, permitindo definir uma mensagem
 * e um status HTTP para cada situação.
 *
 * Extende a classe nativa Error para que os erros
 * sejam compatíveis com o tratamento de erros do Express.
 */
export class AppError extends Error {

    /**
     * @param {string} message - Mensagem descritiva do erro.
     * @param {number} statusCode - Código HTTP correspondente ao erro.
     */
    constructor(message, statusCode = 400) {

        // Inicializa a mensagem herdada da classe Error.
        super(message);

        // Armazena o status HTTP para o ErrorHandler utilizar.
        this.statusCode = statusCode;
    }
}
