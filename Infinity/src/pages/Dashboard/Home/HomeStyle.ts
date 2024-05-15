import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    width: 100vw;
    min-height: 100dvh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    margin-left: -20px !important;
    background-image: url("/images/background-home.jpg");
    background-size: cover; /* Para ajustar o tamanho da imagem */
    background-position: center; /* Para centralizar a imagem */
`;

export const Box = styled.div`
    /* margin: 0 auto;
    width: 70%;
    max-width: 700px;
    height: 400px;
    border-radius: 10px; */
`;

export const Image = styled.img`
    opacity: 0.1;
    width: 500px;  
    margin-top: -100px;
`;

export const AreaInfo = styled.h2`
    //font-family: comic, sans-serif;
    //font-size: 40px;
    //color: #333; /* Cor do texto */
    //font-weight: bold;
`;