import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { BoxButtons, Button, Header } from './ContatosPesquisarStyle';
import { ContatosAdicionar } from '../../../../routes/RoutesNames';
import * as Icon from '@mui/icons-material/';
import ContatoController from '../../../../controllers/ContatoController';
import { useSelector } from "react-redux";
import { Helpers } from '../../../Components/Helpers/Helpers';
import { useState, useRef, MutableRefObject, useEffect } from 'react';
import ComponentTable from '../../../Components/Table/Index';
import { Column } from '../../../Components/Table/Types';
import { IconButton } from '@mui/material';
import { ModalAction } from '../../../Components/ModalAction/ModalAction'
import ModalAlert from '../../../Components/AlertComponents/Modal/ModalAlert';
import SnackAlert from '../../../Components/AlertComponents/Snack/SnackAlert';

interface Row {
    BtnEditar: JSX.Element;
    BtnExcluir: JSX.Element;
    Id: number;
    Nome: string;
    Celular: string;
    DataInclusao: string | Date;
}

interface Modal {
    title?: string
    description1: string
    description2?: string
    colorType?: string
}

export default function Contatos() {
    const ref = useRef<HTMLButtonElement>(null);
    const userId = useSelector(state => state.Authentication.userId);
    const navigate = useNavigate();

    const [tableColumns, setTableColumns] = useState<Column[]>([
        //{ id: 'Edit'},
        //{ id: 'Delete'},
        /*        { id: 'Id', label: 'ID', minWidth: 0 },*/
        { id: 'BtnEditar', label: '', width: 60, minWidth: 0 },
        { id: 'BtnExcluir', label: '', width: 60, minWidth: 0 },
        { id: 'Nome', label: 'Nome', minWidth: 0 },
        { id: 'Celular', label: 'Celular', minWidth: 0 },
        { id: 'DataInclusao', label: 'Inclusão', minWidth: 0 }
    ]);

    const [tableRows, setTableRows] = useState<Row[] | null>([]);
    const [snack, setSnack] = useState<Modal | any>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        ref?.current?.click();
    }, []);

    const handleSubmit = async (values: any, { setSubmitting }: any): Promise<void> => {

        console.log(values);
        setSubmitting(false);
        //setTableRows([]);

        const dataRows: any = [];
        const response = await ContatoController.Buscar(values);

        if (response.StatusCode === 200) {

            response.Data.map((item: Row) => {

                dataRows.push({
                    BtnEditar: <IconButton onClick={() => handleEditItem(item.Id, item.Nome, item.Celular)} aria-label="edit" color='info' title="Editar" > <Icon.Edit /></IconButton >,
                    BtnExcluir: <IconButton onClick={() => handleDeleteItem(item.Id)} aria-label="delete" color='error' title="Excluir"><Icon.Delete /></IconButton>,
                    Id: item.Id,
                    Nome: item.Nome,
                    Celular: Helpers.CellPhoneMaskShowing(item.Celular),
                    DataInclusao: Helpers.DateFormatShowing(item.DataInclusao)
                });

                setTableRows(dataRows);

            });
        }
        else {
            setTableRows(null);
            setSnack({
                title: "Erro",
                description: "Não foi possivel carregar os contatos!",
                colorType: "#C62828"
            });
        }
    };

    const handleEditItem = (id: number, nome: string, celular: string) => {

        navigate(ContatosAdicionar, {
            state: {
                ContatoId: id,
                Nome: nome,
                Celular: celular
            }
        });
    }


    const handleDeleteItem = async (id: number) => {

        const request: any = { UserId: userId, ContatoId: id }
        const response = await ContatoController.Excluir(request);

        if (response.StatusCode === 200) {
            setSnack({
                title: "Concluído",
                description: "Contato excluído com sucesso.",
                colorType: "#1B5E20"
            });

            ref?.current?.click();
        }
        else {
            setSnack({
                title: "Erro",
                description: "Não foi possivel carregar os contatos!",
                colorType: "#C62828"
            });
        }
    }


    const handleDeleteAll = async () => {
        if(tableRows?.length > 0)
        setModalOpen(true);
    }


    const handleDeleteAllConfirmation = async (senha: string) => {

        const request: any = { UserId: userId, Senha: senha }
        const response = await ContatoController.ExcluirTudo(request);

        if (response.StatusCode === 200) {
            //Força o Grid a ser recarregado!
            ref?.current?.click();
            setSnack({
                title: "Erro",
                description: "Contatos excluídos com sucesso!",
                colorType: "#1B5E20"
            });
        }
        else {
            setSnack({
                title: "Erro",
                description: response.Data,
                colorType: "#C62828"
            });
        }

    }

    const handleCloseModal = () => setModalOpen(false);
    const CloseSnack = (): void => setSnack(null);
    


    const handleNavigation = async (): Promise<void> => {
        navigate(ContatosAdicionar);
    }


    const initialValues = {
        UsuarioId: userId,
        Nome: '',
        Celular: ''
    };


    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
        >
            {/*{modal !== null &&*/}
            {/*    <ModalAlert modalProps={modal} onClose={CloseModal} />*/}
            {/*}*/}

            {snack !== null &&
                <SnackAlert modalProps={snack} onClose={CloseSnack} />
            }

            <div style={{ paddingBottom: 30 }}>
                <Header>CONTATOS</Header>

                <Formik
                    initialValues={initialValues}
                    //validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, handleSubmit }) => (
                        <Form>

                            <BoxButtons>
                                <Button ref={ref} type="submit" variant="contained" onClick={handleSubmit} color='primary' startIcon={<Icon.Search />}>
                                    Buscar
                                </Button>
                                <Button variant="contained" onClick={handleNavigation} color='success' startIcon={<Icon.Add />}>
                                    Incluir
                                </Button>
                                <Button variant="contained" onClick={handleDeleteAll} color='error' startIcon={<Icon.Delete />}>
                                    Excluir tudo
                                </Button>          

                            </BoxButtons>

                            <ModalAction open={modalOpen} onClose={handleCloseModal} onConfirm={handleDeleteAllConfirmation} />

                            <Field
                                name="Nome"
                                as={TextField}
                                label="Nome"
                                type="text"
                                error={Boolean(errors?.Nome)}
                                helperText={errors?.Nome}
                            />
                            <Field
                                name="Celular"
                                as={TextField}
                                //id="outlined-password-input"
                                label="Celular"
                                type="text"
                                error={Boolean(errors?.Celular)}
                                helperText={errors?.Celular}
                                onInput={(e: any) => Helpers.CellPhoneMaskEditing(e)}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
            <ComponentTable columns={tableColumns} rows={tableRows} />
        </Box>
    );
}