import { produce } from 'immer';

const initialState: any = {
    userId: null,
    clientId: null
};

const Authentication = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case '@USUARIO/SALVAR_ID':
            console.log("")
            console.log("Dado Recebido no estado de memória ( Reducer ) !")
            console.log(action.payload)
            console.log("")
            return produce(state, (draft: { userId: number; }) => {
                draft.userId = action.payload;
            });
        case '@USUARIO/SALVAR_CLIENT_ID':
            return produce(state, (draft: { clientId: string; }) => {
                draft.clientId = action.payload;
            });
        default:
            return state;
        }
};

export default Authentication;