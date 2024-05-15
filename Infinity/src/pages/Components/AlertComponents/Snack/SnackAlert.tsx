import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { Snack } from './SnackAlertStyle';

type Props = {
    modalProps: {
        title: string
        description: string
        colorType: string
    },
    onClose: () => void
};

export default function SnackAlert({ modalProps, onClose }: Props ) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log(modalProps)

    React.useEffect(() => {
        handleOpen();
    }, []);

    return (
        <div>
            <Snack
                open={open}
                onClose={onClose}
                TransitionComponent={Slide}
                message={modalProps.description}
                // key={state.Transition.name}
                autoHideDuration={1200}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                ContentProps={{
                    sx: {
                        backgroundColor: modalProps.colorType, 
                        color: '#fff', 
                        fontSize: '16px', 
                    }
                }}
            />
        </div>
    );
}