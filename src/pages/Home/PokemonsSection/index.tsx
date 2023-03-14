import { Typography } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    increaseOffsetBy,
    populatePokemons,
    setTotalCount,
} from '../../../app/pokemon';
import { ExtPokemonClient } from '../../../features/pokemon/services/pokemonApi';
import { RequestFn } from '../../../features/pokemon/types/apiTypes';
import { PokemonList } from '../../../features/pokemon/types/pokemonTypes';
import useFetch, { Status } from '../../../hooks/useFetch';
import LoadButton from '../LoadButton';
import PokemonCount from '../PokemonCount';
import PokemonGrid from '../PokemonGrid';
import * as S from './styles';

const POKEMON_PER_PAGE = 20;

const computePokemonRequest = (offset: number): RequestFn<PokemonList> => {
    const fn = () =>
        ExtPokemonClient.listFullPokemons(offset, POKEMON_PER_PAGE);
    return fn;
};

const PokemonsSection = () => {
    const dispatch = useAppDispatch();
    const { pokemons, offset, totalCount } = useAppSelector(
        (state) => state.pokemon
    );
    const [pokemonsRequestFn, setPokemonsRequestFn] =
        useState<RequestFn<PokemonList> | null>(() =>
            /* Ensures new Pokemons are not loaded automatically if the user
            navigates to a profile page and comes back. */
            pokemons.length > 0 ? null : computePokemonRequest(offset)
        );
    const { status } = useFetch({
        requestFn: pokemonsRequestFn,
        onEnd: (data) => {
            dispatch(populatePokemons(data.results));
            dispatch(setTotalCount(data.count));
        },
    });

    const loadMorePokemons = () => {
        const newOffset = offset + POKEMON_PER_PAGE;
        const newReq = computePokemonRequest(newOffset);
        dispatch(increaseOffsetBy(POKEMON_PER_PAGE));
        setPokemonsRequestFn(() => newReq);
    };

    if (status === Status.Error) {
        return <Typography>Failed to load Pokémons.</Typography>;
    }

    const allPokemonsLoaded =
        pokemons.length !== 0 && pokemons.length === totalCount;

    return (
        <S.Box component='section'>
            {totalCount > 0 && (
                <PokemonCount count={pokemons.length} totalCount={totalCount} />
            )}
            <PokemonGrid pokemons={pokemons} />
            {!allPokemonsLoaded && (
                <LoadButton
                    loading={status === Status.Fetching}
                    onClickHandler={loadMorePokemons}
                />
            )}
        </S.Box>
    );
};

export default PokemonsSection;
