// import * as React from 'react';
// import * as Icon from '@mui/icons-material/';
// import { Box, Button } from './Styles';

// interface Props {
//     onClick: () => void;
// };

// export default function PesquisaButtons({ onClick }: Props) {

//     // const selectedSubMenu = () => {

//     //     let subscreen: string = "";

//     //     if(subcreen === "Clientes") 
//     //         subscreen = "ClientesCadastro"
//     //     else if(screen === "Produtos")
//     //         subscreen = "ProdutosCadastro"

//     //     onClick(subscreen);
    
//     // }

//     return (
//         <Box>
//             <Button variant="contained" color='primary' startIcon={<Icon.Search />}>
//                 Buscar
//             </Button>
//             <Button variant="contained" onClick={onClick} color='success' startIcon={<Icon.Add />}>
//                 Incluir
//             </Button>
//             {/* <Button variant="contained" color='warning' startIcon={<Icon.Edit />}>
//                 Editar
//             </Button> */}
//             {/* <Button variant="contained" color='warning' endIcon={<Icon.Send />}>
//                 Send
//             </Button> */}
//         </Box>
//     );
// }

// // inherit: Usa a cor do elemento pai.
// // primary: A cor primária definida no tema do Material-UI.
// // secondary: A cor secundária definida no tema do Material-UI.
// // default: Usa a cor padrão (geralmente cinza).
// // error: Usa a cor de erro (geralmente vermelho).
// // info: Usa a cor de informação (geralmente azul).
// // success: Usa a cor de sucesso (geralmente verde).
// // warning: Usa a cor de aviso (geralmente amarelo).
// // textPrimary: Cor do texto primário definida no tema do Material-UI.
// // textSecondary: Cor do texto secundário definida no tema do Material-UI.
// // primary.contrastText: Cor do texto contrastante para a cor primária.
// // secondary.contrastText: Cor do texto contrastante para a cor secundária.
// // error.contrastText: Cor do texto contrastante para a cor de erro.
// // info.contrastText: Cor do texto contrastante para a cor de informação.
// // success.contrastText: Cor do texto contrastante para a cor de sucesso.
// // warning.contrastText: Cor do texto contrastante para a cor de aviso.
// // grey: Uma escala de cinza, incluindo 50, 100, 200, 300, 400, 500, 600, 700, 800 e 900.
// // divider: Cor da divisória.