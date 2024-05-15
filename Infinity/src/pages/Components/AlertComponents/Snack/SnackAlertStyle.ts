import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import styled from 'styled-components';

// Estilização do Snackbar
export const Snack = styled(Snackbar)`
    .MuiSnackbarContent-root {
        //background-color: #2E7D32; // Cor de fundo do Snackbar
        color: #fff; // Cor do texto do Snackbar
        font-size: 16px; // Tamanho da fonte do texto do Snackbar
    }
`;