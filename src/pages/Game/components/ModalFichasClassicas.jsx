import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

export default function ModalFichasClassicas( {setMostrar, setTemaState} ) {
    return (
        <div key={`modalSelecaoDeTema-Categoria-Classicos`}>
            <Typography
                sx={{
                    borderRadius: 60,
                    color: 'font.emphasis',
                    mt: 2,
                    backgroundColor: 'background.accordionHeader'
                }}
            >
                {'CLÁSSICOS'}
            </Typography>
            <Grid container justifyContent={'center'} spacing={1} sx={{mt: 1}}>
                {['red','yellow'].map((tema, index) => {
                    return (
                        <Grid key={`modalSelecaoDeTema-Tema-${index}`} xs={3}>
                            <Box sx={{mb: 1}}>
                                <Button
                                    sx={{borderRadius: 60}}
                                    onClick={() => {setMostrar(false); setTemaState(tema)} }
                                >
                                    <Avatar alt="tema.titulo"
                                        sx={{border: '1px solid white',
                                        backgroundColor: tema,
                                        color: tema
                                        }}
                                    />
                                </Button>
                                <Typography>
                                    {tema}
                                </Typography>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}