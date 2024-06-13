import styled from "styled-components";
import { Button as btn } from '@mui/material';

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