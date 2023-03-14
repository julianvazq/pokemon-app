import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { populatePokemons } from '../../app/pokemon';
import { ExtPokemonClient } from '../../features/pokemon/services/pokemonApi';
import useFetch, { Status } from '../../hooks/useFetch';
import PokemonGrid from './PokemonGrid';

const listFullPokemons = ExtPokemonClient.listFullPokemons(undefined, 20);

const Home = () => {
    const { pokemons } = useAppSelector((state) => state.pokemon);
    const dispatch = useAppDispatch();
    const { status } = useFetch({
        promise: listFullPokemons,
        dispatch: (data) => dispatch(populatePokemons(data)),
    });

    if (status === Status.Idle || status === Status.Fetching) {
        return <Typography>Loading Pokémons...</Typography>;
    }

    if (status === Status.Error) {
        return <Typography>Failed to load Pokémons.</Typography>;
    }

    return (
        <>
            <PokemonGrid pokemons={pokemons} />
        </>
    );
};

export default Home;
