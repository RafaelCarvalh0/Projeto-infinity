import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { IconButton, ListItemIcon } from '@mui/material';
import * as Icon from '@mui/icons-material/';
import { ListItem, ListItemButton, ListItemText } from '@mui/material/';
import { menus } from '../../routes/Menus';
import { AppBar, Drawer, DrawerHeader, StyledBox } from './DashboardStyle';
import { Outlet, useNavigate } from 'react-router-dom';
// import Screens from './Screens/Index';
import { Login, Home } from '../../routes/RoutesNames';
import { useEffect } from 'react';

export default function Dashboard() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [open, setOpen] = React.useState<boolean>(false);
    const [screen, setScreen] = React.useState<string>(Home);
  
    const handleDrawerOpen = (): void => {
        setOpen(true);
    };

    const handleDrawerClose = (): void => {
        setOpen(false);
    };

    const refresh = (): void => {
        window.location.reload();
    }

    const handleMenuItemClick = (path: string): void => setScreen(path);

    useEffect(() => {
        // console.log("Tela selecionada");
        console.log(screen)
        navigate(screen);
    },[screen]);

    const handleUnderlineMenuItemClick = async (path: string): void => {

        if (path === 'Sair') {
            await sessionStorage.removeItem('clientId');
            //const terminate = await SessionController.Terminate(clientId);
            //const status = await SessionController.Status(clientId);
            navigate(Login);
        }

        setScreen(path);
    }

    // console.log("SCREEN !!!!!!!   ", screen);

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#F3F3F1', height: '100%' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ marginRight: 5, ...(open && { display: 'none' }) }} >
                        <Icon.Menu />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div">

                        <div style={{ display: 'flex', paddingTop: '7px' }}>
                            <img src="/images/infinity.png" style={{ cursor: 'pointer', padding: 8 }} onClick={refresh} width={108} alt="Infinity"></img>
                            {/* {screens.screen !== null &&
                                screens.screen !== "Home" ? <PesquisaButtons onClick={handleSubmenuClick} /> : null
                            }
                            {screens.subscreen !== null && screens.screen === null &&
                                <CadastroButtons />
                            } */}
                        </div>

                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <Icon.ChevronRight /> : <Icon.ChevronLeft style={{ color: '#F3F3F1' }} />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menus.map((item, index) => (
                        <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={() => handleMenuItemClick(item.screenRoute)} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }} title={item.screenName} >
                                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#F3F3F1' }} >
                                    {<item.icon />}
                                </ListItemIcon>
                                <ListItemText primary={item.screenName} primaryTypographyProps={{ fontWeight: 'bold', color: '#F3F3F1' }} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Quem somos', 'Sair'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={() => handleUnderlineMenuItemClick(text)} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }} title={text} >
                                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#F3F3F1' }} >
                                    {index % 2 === 0 ? <Icon.HomeWork /> : <Icon.Logout />}
                                </ListItemIcon>
                                <ListItemText primary={text} primaryTypographyProps={{ fontWeight: 'bold', color: '#F3F3F1' }} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <StyledBox>       

                <Outlet />

            </StyledBox>
        </Box>
    );
}
