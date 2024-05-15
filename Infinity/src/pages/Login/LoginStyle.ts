import styled, { keyframes } from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 100vw;
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: url("../../images/fundo.jpg");
    z-index: 1;
    background-size: cover; /* Para ajustar o tamanho da imagem */
    background-position: center; /* Para centralizar a imagem */
    /* background: linear-gradient(to right, #a68a64, #edf2f4); */
    letter-spacing: 10px; 
`;

export const Logo = styled.img`
    margin-top: 40px;
    width: 150px;
`;

export const Box = styled.div`
    display: block;
    background-image: url('../../images/background-login.jpg'); 
    margin: auto;
    width: 70%;
    max-width: 600px;
    background-color: #f1f1f1;
    height: 380px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    //justify-content: center; /* Centraliza verticalmente */
    height: 100%; /* Para garantir que o container ocupe toda a altura do Box */
`;

export const Input = styled.input`
  color: black;
  width: 80%;
  margin-bottom: 30px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const aviso = keyframes`
    from {
        color: rgb(100, 0, 0);
    }

    to {
        color: red;
    }
`;

export const ErrorMessage = styled.p`
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: -15px;
    font-size: 0.8rem;
    font-family: "Apple Color Emoji", "Segoe UI Emoji", "NotoColorEmoji", "Segoe UI Symbol", "Android Emoji", "EmojiSymbols";
    color: red;
    margin-bottom: 15px;
    font-weight: 600;
    animation: ${aviso} 0.7s infinite alternate;
`;

export const Button = styled.button`
    color: white;
    font-size: 14pt;
    background-color: #00B0B4;
    padding: 7px;
    border-radius: 5px;
    border: 1px solid #008891;
    cursor: pointer;
    width: 25%;
    font-weight: bold;
    letter-spacing: 2px; 
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    transition: background-color 0.3s ease; /* Adicionando uma transição suave */

    &:hover {
        background-color: #008891; /* Mudança de cor quando em hover */
    }
`;