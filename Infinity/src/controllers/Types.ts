export interface Props {
    Email: string | undefined;
    Senha: string | undefined;
}

export interface Login {
    Id: number,
    ClientId: string
}

export interface Contato {
    UsuarioId: number
    ContatoId?: number
    Nome: string
    Celular: string
}

export interface Response {
    StatusCode?: number | null,
    Data: any
}

export interface ContatoLote {
    UsuarioId: number
    ContatoJson: string
}

export interface Mensagem {
    ClientId: string
    Contatos: []
    Imagem: string
    Mensagem: string
}