//@ts-check
/** State */
import React, { useState } from 'react';
/** Navigate */
import { useNavigate } from 'react-router-dom';
/** MUI */
import { 
    AppBar, 
    Toolbar, 
    Container, 
    Typography, 
    Box, 
    Slide, 
    useScrollTrigger, 
    IconButton, 
    Menu, 
    MenuItem, 
    Tooltip, 
    Avatar,
    Button,
} from '@mui/material';
import ExtensionIcon from '@mui/icons-material/Extension';
import MenuIcon from '@mui/icons-material/Menu';
/** Assets */
import profileImg from './../../../../static/images/avatar/logo-profile-01.png'


export default function SharedLayoutHeader( ) {

    /** Hide Bar when Scroll */
    const trigger = useScrollTrigger();

    /** Responsive Bar */
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    /** Navigate */
    const navigate = useNavigate();
    const navegarPagina = ((page) => {
        navigate(`/${page}`)
    })

    /** Mockup */
    let paginas = ['sobre', 'regras', 'contatos']
    let configuracao = ['perfil', 'login/logout', 'configurações']

    return(
        <>
            <Slide appear={false} direction='down' in={!trigger}>
                <AppBar sx={{color: 'primary.main', bgcolor: 'background.navBar'}}  >
                    <Container maxWidth="xl" >
                        <Toolbar disableGutters variant="dense">

                            {/** BIG SCREENS */}
                            {/** Logo */}
                            <Box sx={{display: { xs: 'none', md: 'flex' }, flexGrow: 1}}>
                                <Button onClick={() => navegarPagina('/')} >
                                    <ExtensionIcon sx={{ 
                                        display: { xs: 'none', md: 'flex' }, 
                                        mr: 1,
                                    }} />
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="a"
                                        href="/"
                                        sx={{
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.2rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        }}
                                    >
                                        4em'
                                    </Typography>
                                </Button>
                            </Box>
                            {/** Paginas */}
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {paginas.map((page, index) => (
                                <Button
                                    key={`${page}`}
                                    onClick={() => navegarPagina(page)}
                                    sx={{ my: 2, color: 'primary.veryLightMain', display: 'block' }}
                                >
                                    {`${page}`}
                                </Button>
                                ))}
                            </Box>

                            {/** SMALL SCREENS */}
                            {/** Menu */}
                            <Box sx={{ 
                                flexGrow: 2,
                                display: { xs: 'flex', md: 'none' },
                            }}>
                                <IconButton 
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                    
                                >
                                    <MenuIcon sx={{
                                        color: 'primary.lightestMain'
                                    }}/>
                                </IconButton>
                                <Menu
                                    id='menu-appbar'
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{ 
                                        display: {xs: 'block', md: 'none'}
                                    }}
                                >
                                    {paginas.map((page, index) => (
                                        <MenuItem key={`${page}`} onClick={() => console.log(`tela pequena pagina`)} sx={{
                                            color: 'primary.lightestMain',
                                        }}
                                        >
                                            <Typography textAlign="center">{`${page}`}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                                {/** Logo */}
                                <ExtensionIcon sx={{my: 'auto'}} />
                            </Box>

                            {/** BIG & SMALL SCREENS */}
                            {/** Avatar */}
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="User Options">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Avatar" src={profileImg} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    >
                                    {configuracao.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu} sx={{
                                                color: 'primary.lightestMain',
                                            }}>
                                            <Typography textAlign="center" sx={{color: 'primary.veryLightMain'}} >
                                                {setting}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Slide>
            <Box sx={{height: 80}} />
        </>
    )
}