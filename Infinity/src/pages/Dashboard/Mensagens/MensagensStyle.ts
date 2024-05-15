import styled from "styled-components"
import { Button  as btn} from '@mui/material';

//export const Container = styled.div`
    //display: flex;
    //height:100%;
    //width: 100%;
    //flex-direction: column; /* Para que os filhos sejam empilhados verticalmente */
   
    //overflow: hidden; /* Para evitar barras de rolagem em excesso */

    /* Estilo dos filhos (elementos dentro do Container) */
   // & > * {
        //flex: 1; /* Para que cada filho ocupe o espaço disponível */
       // overflow: auto; /* Adiciona uma barra de rolagem se o conteúdo exceder o espaço */
    //}
//`;

export const Header = styled.h2`
    display: block;
    margin-bottom: 20px;
    background-Color: #008891;
    color: #F3F3F1; 
    width: 100%; 
    text-Align: center;
    border-radius: 0px 0px 5px 5px;
`;

export const BoxButtons = styled.div`
    display: block;
    text-align: start;
    padding: 5px;
    border-radius: 10;
    color: #FFF;
    font-size: 15px;
    margin-left: 300;
    margin-bottom: 10px;
    /* border: 1px solid blue; */
`;

export const Button = styled(btn)`
    text-align: end;
    background-color: #198754;
    padding: 5px;
    border-radius: 10;
    color: #FFF;
    font-size: 15px;
    margin-left: 10px !important;;
`;

// export const Area = styled.div`
//     min-width: 100%;
//     border-bottom: 1px solid #BBB;
// `;

// // export const AreaInput = styled.div`
// //     min-width: 90%;
// //     text-align: center !important;
// //     border-bottom: 10px solid red;
// //     display: block;
// //     flex-direction: column;
// //     margin: 0 auto;
// // `;

// export const FormContainer = styled.div`
//   /* width: 100%;
//   display: flex;
//   flex-wrap: wrap; */
//   margin-right: -20px;
// `;


// export const Row = styled.div`

//     /* display: flex;
//     gap: 20px;
    
//     @media (max-width: 800px) {
//         display: block;
//     } */

//   width: 100%;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: start;
//   margin-bottom: 10px;

//   & > * {
//     width: calc(96%); /* Espaço entre os elementos */
//     margin-bottom: 20px; /* Espaço entre as linhas */
//   }

//   @media (min-width: 600px) {
//     & > * {
//       width: calc(50% - 20px); /* Duas colunas em telas médias e maiores */
//       margin-right: 20px;
//     }
//   }

//   @media (min-width: 900px) {
//     & > * {
//       width: calc(33.333% - 20px); /* Três colunas em telas grandes */
//       margin-right: 20px;
//     }
//   }

//   @media (min-width: 1200px) {
//     & > * {
//         width: calc(25% - 20px); /* Quatro colunas em telas extra grandes */
//         margin-right: 20px;
//     }
//   }

//   @media (min-width: 1500px) {
//     & > * {
//         width: calc(20% - 20px); /* Cinco colunas em telas extra grandes */
//         margin-right: 20px;
//     }
//   }
// `;

// export const Table = styled.table`
//     //width: auto; //Descomente para criar scroll lateral no table
//     width: 100%;
//     margin: 15px auto;
//     border-radius: 5px;
//     background-color: #DDD;
//     border-collapse: collapse;
//     color: black;
//     table-layout: fixed;
// `;

// export const Thead = styled.thead`
//     /* padding: 10px;   */
//     z-index: 1;
// `;

// export const Th = styled.th`
//     text-align: start;
//     min-width: 100px;
//     padding: 10px;
//     color: rgb(250, 250, 250);
//     border-bottom: 1px solid #CCC;
//     background-color: #E10511;   
// `;

// export const Trow = styled.tr`
//     width: 100%;  
//     min-width: 100px;  
// `;

// export const RowTb = styled.tr`
//     width: 100%;
//     border-top: 1px solid #CCC;
// `;

// export const Td = styled.td`
//     padding: 10px;  
//     min-width: 100px;
// `;

// export const Layout = styled.section`
//     width: 800px;
//     margin: 0 auto;
// `