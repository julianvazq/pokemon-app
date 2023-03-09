import { FunctionComponent, useEffect } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
export type AppProps = {};

export const App: FunctionComponent<AppProps> = () => {
    return (
        <Container maxWidth='sm'>
            <Box sx={{ my: 4 }}>
                <Typography variant='h4' component='h1' align='center'>
                    {'Pokemon here'}
                </Typography> 
                <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/143.svg'/>               
            </Box>
        </Container>
    );
};
