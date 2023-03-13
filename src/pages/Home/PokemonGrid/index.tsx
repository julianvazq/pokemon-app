import { Grid } from '@mui/material';
import { Pokemon } from 'pokenode-ts';
import { FunctionComponent } from 'react';
import PokemonCard from '../PokemonCard';

type Props = {
    pokemons: Pokemon[];
};

const PokemonGrid: FunctionComponent<Props> = ({ pokemons }) => {
    return (
        <Grid container spacing={2}>
            {pokemons.map((p) => (
                <Grid key={p.name} xs={12} sm={6} md={3} lg={2} item>
                    <PokemonCard pokemon={p} />
                </Grid>
            ))}
        </Grid>
    );
};

export default PokemonGrid;
