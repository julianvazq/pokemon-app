import { Container } from '@mui/material';
import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import PokemonPage from './pages/Pokemon';

export type AppProps = {};

export const App: FunctionComponent<AppProps> = () => {
    return (
        <Container maxWidth='lg' sx={{ p: 2 }}>
            <AppHeader />
            <Routes>
                <Route index element={<Home />} />
                <Route path='/pokemon/:pokemonName' element={<PokemonPage />} />
            </Routes>
        </Container>
    );
};
