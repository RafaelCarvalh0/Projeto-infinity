export interface Column {
    id: any;
    label: string;
    width?: number;
    minWidth?: number;
    align?: 'center' | 'left' | 'center';
    //format?: (value: number) => string;
}

// export interface TableButton {
//     button: JSX.Element;
// }

//export function createData<T>(data: T): T {
//    return data;
//}


//export interface Data {
//    nome: string,
//    participantes: string,
//    status: string
//}

//export function createData(
//    nome: string,
//    participantes: string,
//    status: string
//): Data {
//    return { nome, participantes, status };
//}


