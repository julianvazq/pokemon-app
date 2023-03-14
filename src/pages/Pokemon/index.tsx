import { Card, Grid, Typography } from '@mui/material';
import { Pokemon } from 'pokenode-ts';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { ExtPokemonClient } from '../../features/pokemon/services/pokemonApi';
import useFetch, { Status } from '../../hooks/useFetch';
import PokemonDetails from './PokemonDetails';
import PokemonImage from './PokemonImage';

const PokemonPage = () => {
    const { pokemonName } = useParams();
    const { pokemons } = useAppSelector((state) => state.pokemon);
    const [pokemon, setPokemon] = useState<Pokemon | null>(
        /* Try to get from Redux store first. */
        () => pokemons?.find((p) => p.name === pokemonName) || null
    );
    const { status } = useFetch({
        requestFn: pokemon
            ? null
            : () => ExtPokemonClient.getPokemonByName(pokemonName!),
        onEnd: (data) => setPokemon(data),
    });

    if (!pokemon || status === Status.Fetching) {
        return <Typography>Loading Pokémon...</Typography>;
    }

    if (status === Status.Error) {
        return <Typography>Failed to fetch Pokémon.</Typography>;
    }

    return (
        <Card sx={{ backgroundColor: '#ffffff' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={4} md={4}>
                    <PokemonImage
                        src={
                            (pokemon.sprites.front_shiny ||
                                pokemon.sprites.front_default)!
                        }
                        name={pokemon.name}
                    />
                </Grid>
                <Grid item xs={12} sm md>
                    <PokemonDetails pokemon={pokemon} />
                </Grid>
            </Grid>
        </Card>
    );
};

export default PokemonPage;
