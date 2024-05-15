import { createGlobalStyle } from "styled-components"; 
import '@fontsource/montserrat/400.css';

const GlobalStyles = createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        font-family: 'montserrat', sans-serif, 'Roboto', 'open-sans';     
    }

    body {
        width: 100vw;
        height: 100vh;
        display: flex;
    }

    #root {
        width: 100%;
    }

`;

export default GlobalStyles;