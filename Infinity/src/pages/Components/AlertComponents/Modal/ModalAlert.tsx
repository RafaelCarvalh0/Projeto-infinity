import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ModalBox } from './ModalAlertStyle';
import { useEffect } from 'react';

type Props = {
    modalProps: {
        title: string
        description1: string
        description2?: string
        colorType: string
    },
    onClose: () => void
};

export default function ModalAlert({ modalProps, onClose }: Props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        handleOpen();

        document.addEventListener('keydown', handleKeyDown);

        // Remove o event listener quando o componente é desmontado
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }

    }, []);

    const handleKeyDown = (event: KeyboardEvent) => {
        // Verifica se a tecla pressionada é a tecla Enter (código 13)
        if (event.keyCode === 13) {
            // Executa a função onClose quando Enter é pressionado
            onClose();
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ModalBox>
                <Typography id="modal-modal-title" variant="h6" sx={{ fontWeight: 'bold', color: '#008891' }} component="h2">
                    {modalProps.title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {modalProps.description1}
                    <br />
                    {modalProps.description2}
                </Typography>
            </ModalBox>
        </Modal>
    );
}