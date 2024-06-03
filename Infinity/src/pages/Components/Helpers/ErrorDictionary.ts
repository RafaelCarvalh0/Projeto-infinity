export const ErrorDictionary = (statusCode: number): string => {
    switch (statusCode) {
        case 400:
            return 'Erro 400: Requisição inválida.';
        case 401:
            return 'Acesso não autorizado.';
        case 403:
            return 'Erro 403: Acesso proibido.';
        case 404:
            return 'Erro 404: Página não encontrada.';
        case 500:
            return 'Erro 500: Erro interno do servidor.';
        default:
            return `Erro ${statusCode}: Ocorreu um erro inesperado.`;
    }
};


