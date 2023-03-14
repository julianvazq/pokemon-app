import { Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    increaseOffsetBy,
    populatePokemons,
    setTotalCount,
} from '../../../app/pokemon';
import { ExtPokemonClient } from '../../../features/pokemon/services/pokemonApi';
import { PokemonList } from '../../../features/pokemon/types/pokemonTypes';
import useFetch, { Status } from '../../../hooks/useFetch';
import PokemonCount from '../PokemonCount';
import PokemonGrid from '../PokemonGrid';
import * as S from './styles';

const POKEMON_PER_PAGE = 20;

const computePokemonRequest = (offset: number) => {
    return ExtPokemonClient.listFullPokemons(offset, POKEMON_PER_PAGE);
};

const PokemonsSection = () => {
    const dispatch = useAppDispatch();
    const { pokemons, offset, totalCount } = useAppSelector(
        (state) => state.pokemon
    );
    const [computedPokemonsReq, setComputerPokemonsReq] =
        useState<Promise<PokemonList> | null>(() =>
            /* Ensures new Pokemons are not loaded automatically if the user
            navigates to a profile page and comes back. */
            pokemons.length ? null : computePokemonRequest(offset)
        );
    const { status } = useFetch({
        request: computedPokemonsReq,
        dispatch: (data) => {
            dispatch(populatePokemons(data.results));
            dispatch(setTotalCount(data.count));
        },
    });

    const loadMorePokemons = () => {
        dispatch(increaseOffsetBy(POKEMON_PER_PAGE));
        const newOffset = offset + POKEMON_PER_PAGE;
        setComputerPokemonsReq(computePokemonRequest(newOffset));
    };

    if (status === Status.Error) {
        return <Typography>Failed to load Pokémons.</Typography>;
    }

    return (
        <S.Box component='section'>
            {totalCount > 0 && (
                <PokemonCount count={pokemons.length} totalCount={totalCount} />
            )}
            <PokemonGrid pokemons={pokemons} />
            {pokemons.length > 0 && status !== Status.Fetching && (
                <Button variant='contained' onClick={loadMorePokemons}>
                    Load more
                </Button>
            )}
            {status === Status.Fetching && (
                <CircularProgress title='Loading...' />
            )}
        </S.Box>
    );
};

export default PokemonsSection;
