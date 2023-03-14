import { Grid } from '@mui/material';
import { Pokemon } from 'pokenode-ts';
import { FunctionComponent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { turnPokemon } from '../../../app/pokemon';
import PokemonCard from '../PokemonCard';

type Props = {
    pokemons: Pokemon[];
};

const PokemonGrid: FunctionComponent<Props> = ({ pokemons }) => {
    const dispatch = useAppDispatch();
    const { pokemonsThatTurned } = useAppSelector((state) => state.pokemon);

    const onTurn = (pokemonName: string) => {
        dispatch(turnPokemon(pokemonName));
    };

    return (
        <Grid container spacing={2}>
            {pokemons.map((p) => (
                <Grid key={p.name} xs={12} sm={6} md={3} lg={2} item>
                    <PokemonCard
                        pokemon={p}
                        hasTurned={pokemonsThatTurned.includes(p.name)}
                        onTurnHandler={() => onTurn(p.name)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default PokemonGrid;
