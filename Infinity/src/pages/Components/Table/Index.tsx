import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { StyledTableCell, StyledTableHead, StyledTableRow } from './Style';
import IconButton from '@mui/material/IconButton';
import * as Icon from '@mui/icons-material/';
import { Column } from './Types';

type Props = {
    columns: Column[];
    rows: any;
    //onClickEdit?: (id: number, nome: string, celular: string) => void;
    //onClickDelete?: (id: number) => void;
    //onClickExtract?: () => void
}

export default function ComponentTable({ columns, rows }: Props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)', overflow: 'auto' }} >
                <Table stickyHeader aria-label="sticky table">
                    <StyledTableHead sx={{ borderCollapse: 'collapse' }}>
                        <StyledTableRow> 

                            {/*{onClickEdit && <StyledTableCell />}*/}
                            {/*{onClickDelete && <StyledTableCell />}*/}
                            {/*{onClickExtract && <StyledTableCell />}*/}

                            {columns?.map((column: any) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ width: column.width, minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}

                        </StyledTableRow>
                    </StyledTableHead>
                    <TableBody>
                        {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>

                                    {/*{ onClickEdit && */}
                                    {/*<StyledTableCell padding="checkbox" sx={{ minWidth: 'auto' }}>*/}
                                    {/*    <IconButton onClick={() => onClickEdit(row.Id, row.Nome, row.Celular)} aria-label="edit" color='info' title="Editar" > <Icon.Edit /></IconButton >*/}
                                    {/*</StyledTableCell>*/}
                                    {/*}*/}

                                    {/*{ onClickDelete && */}
                                    {/*<StyledTableCell padding="checkbox" sx={{ minWidth: 'auto', paddingRight: 5 }}>*/}
                                    {/*    <IconButton onClick={() => onClickDelete(row.Id)} aria-label="delete" color='error' title="Excluir"><Icon.Delete /></IconButton>*/}
                                    {/*    </StyledTableCell>*/}
                                    {/*}*/}

                                    {/*{ onClickExtract && */}
                                    {/*    <StyledTableCell padding="checkbox" sx={{ minWidth: 'auto', paddingRight: 5 }}>*/}
                                    {/*        <IconButton onClick={() => onClickExtract()} aria-label="extract" color='info' title="Extrair"><Icon.Download /></IconButton>*/}
                                    {/*    </StyledTableCell>*/}
                                    {/*}*/}

                                    {columns.map((column) => {
                                        return (
                                            <StyledTableCell key={column.id} align={column.align} padding="none">
                                                {row[column.id]}
                                            </StyledTableCell>
                                        );
                                    })}

                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[100, 500, 1000]}
                component="div"
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}               
            />
        </Paper>
    );

    //return (
    //    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    //        <TableContainer sx={{ maxHeight: 400 }} >
    //            <Table stickyHeader aria-label="sticky table">
    //                <StyledTableHead sx={{ borderCollapse: 'collapse' }}>
    //                    <StyledTableRow>
    //                        <StyledTableCell />
    //                        <StyledTableCell />
    //                        {columns?.map((column) => (
    //                            <StyledTableCell
    //                                key={column.id}
    //                                align={column.align}
    //                                style={{ minWidth: column.minWidth }}
    //                            >
    //                                {column.label}
    //                            </StyledTableCell>
    //                        ))}
    //                    </StyledTableRow>
    //                </StyledTableHead>
    //                <TableBody>
    //                    {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
    //                        return (
    //                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.celular} >

    //                                <StyledTableCell padding='checkbox'>
    //                                    <IconButton aria-label="edit" color='info' title="Extrair"><Icon.Download /></IconButton>
    //                                </StyledTableCell>

    //                                <StyledTableCell padding='checkbox' sx={{ paddingRight: 10 }} >
    //                                    <IconButton aria-label="delete" color='error' title="Desconsiderar"><Icon.Cancel /></IconButton>
    //                                </StyledTableCell>

    //                                <StyledTableCell padding='checkbox' sx={{ paddingRight: 10 }} >
    //                                    {row.Nome}
    //                                </StyledTableCell>

    //                                <StyledTableCell padding='checkbox' sx={{ paddingRight: 10 }} >
    //                                    {row.Celular}
    //                                </StyledTableCell>

    //                                <StyledTableCell padding='checkbox' sx={{ paddingRight: 10 }} >
    //                                    {row.DataInclusao}
    //                                </StyledTableCell>

    //                            </StyledTableRow>
    //                        );
    //                    })}
    //                </TableBody>
    //            </Table>
    //        </TableContainer>
    //        <TablePagination
    //            rowsPerPageOptions={[10, 25, 100]}
    //            component="div"
    //            count={rows?.length}
    //            rowsPerPage={rowsPerPage}
    //            page={page}
    //            onPageChange={handleChangePage}
    //            onRowsPerPageChange={handleChangeRowsPerPage}
    //        />
    //    </Paper>
    //);
}