import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Icon from '@mui/icons-material/';
import Modal from '@mui/material/Modal';
import { ModalBox, ButtonArea } from './ModalActionStyle';
import { Field } from "formik";
import { Box } from '@mui/material';

export const ModalAction = ({ open, onClose, onConfirm }) => {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirm = () => {
        // Aqui voc� deve implementar a l�gica para verificar a senha
        // Se a senha estiver correta, chame a fun��o `onConfirm`
        // Caso contr�rio, exiba uma mensagem de erro ou fa�a o que for apropriado
        onConfirm(password);
        onClose();
    };

    const handleCancel = () => {

        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ModalBox>
                {/*<Box>*/}
                {/*    Deseja completar esta ação ?*/}
                {/*</Box>*/}
                <Field
                    sx={{ display: 'block' }}
                    as={TextField}
                    id="standard-password-input"
                    label="Senha"
                    type="password"
                    value={password}
                    variant="standard"
                    onChange={handlePasswordChange}
                />
                <ButtonArea>
                    <Button sx={{marginRight: 2}} variant="contained" onClick={handleConfirm} color='success'>
                        Confirmar
                    </Button>
                    <Button variant="contained" onClick={handleCancel} color='error'>
                        Cancelar
                    </Button>
                </ButtonArea>
            </ModalBox>
        </Modal>
    );
};
