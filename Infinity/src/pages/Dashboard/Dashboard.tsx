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

                {/* <Screens screen={screen} /> */}
                <Outlet />

            </StyledBox>
        </Box>
    );
}



// OLD ----------------------
// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
//     open?: boolean;
// }>(({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     backgroundColor: '#faf5e7',
//     transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//         backgroundColor: '#faf5e7',
//         transition: theme.transitions.create('margin', {
//             easing: theme.transitions.easing.easeOut,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//         marginLeft: 0,
//     }),
// }));

// interface AppBarProps extends MuiAppBarProps {
//     open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//     color: '#ffd894',
//     backgroundColor: '#7c5c51',
//     fontWeight: 'bold',
//     transition: theme.transitions.create(['margin', 'width'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//         width: `calc(100% - ${drawerWidth}px)`,
//         marginLeft: `${drawerWidth}px`,
//         color: '#ffd894',
//         backgroundColor: '#7c5c51',
//         fontWeight: 'bold',
//         transition: theme.transitions.create(['margin', 'width'], {
//             easing: theme.transitions.easing.easeOut,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: '#7c5c51',
//     padding: 12,
//     // necessary for content to be below app bar
//     //...theme.mixins.toolbar,
//     justifyContent: 'flex-end',
// }));

// const Dashboard = () => {
//     const theme = useTheme();
//     const [open, setOpen] = React.useState(false);

//     const handleDrawerOpen = () => {
//         setOpen(true);
//     };

//     const handleDrawerClose = () => {
//         setOpen(false);
//     };

//     return (
//         <Box sx={{ display: 'flex' }}>
//             <CssBaseline />
//             <AppBar position="fixed" open={open}>
//                 <Toolbar>
//                     <IconButton
//                         color="inherit"
//                         aria-label="open drawer"
//                         onClick={handleDrawerOpen}
//                         edge="start"
//                         sx={{ mr: 2, ...(open && { display: 'none' }) }}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h5" noWrap component="div">
//                         Promatec
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <Drawer
//                 sx={{
//                     width: drawerWidth,
//                     flexShrink: 0,
//                     '& .MuiDrawer-paper': {
//                         width: drawerWidth,
//                         boxSizing: 'border-box',
//                     },
//                 }}
//                 variant="persistent"
//                 anchor="left"
//                 open={open}
//             >
//                 <DrawerHeader>
//                     <IconButton onClick={handleDrawerClose}>
//                         {theme.direction === 'ltr' ? <ChevronLeftIcon style={{color: '#ffd894'}} /> : <ChevronRightIcon />}
//                     </IconButton>
//                 </DrawerHeader>
//                 <Divider />
//                 <List>
//                     {['Usuários', 'Clientes', 'Produtos', 'Contas á pagar', 'Contas á receber', 'Faturamento'].map((text, index) => (
//                         <ListItem key={text} disablePadding>
//                             <ListItemButton>
//                                 <ListItemIcon>
//                                     {index % 2 === 0 ? <MailIcon /> : <AccessAlarm />}
//                                 </ListItemIcon>
//                                 <ListItemText primary={text} />
//                             </ListItemButton>
//                         </ListItem>
//                     ))}
//                 </List>
//                 <Divider />
//                 <List>
//                     {['Quem somos', 'Sair'].map((text, index) => (
//                         <ListItem key={text} disablePadding>
//                             <ListItemButton>
//                                 <ListItemIcon>
//                                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                                 </ListItemIcon>
//                                 <ListItemText primary={text} />
//                             </ListItemButton>
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>
//             <Main open={open} className='mt-14'>
//                 <Typography paragraph>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//                     tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
//                     enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
//                     imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
//                     Convallis convallis tellus id interdum velit laoreet id donec ultrices.
//                     Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
//                     adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
//                     nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
//                     leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
//                     feugiat vivamus at augue. At augue eget arcu dictum varius duis at
//                     consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
//                     sapien faucibus et molestie ac.
//                 </Typography>
//                 <Typography paragraph>
//                     Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
//                     eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
//                     neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
//                     tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
//                     sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
//                     tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
//                     gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
//                     et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
//                     tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
//                     eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
//                     posuere sollicitudin aliquam ultrices sagittis orci a.
//                 </Typography>
//             </Main>
//         </Box>
//     );
// }

// export default Dashboard;