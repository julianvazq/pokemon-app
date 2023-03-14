import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';
import type { RootState } from './store';

interface PokemonState {
    pokemons: Pokemon[];
    pokemonsThatTurned: string[];
    offset: number;
    totalCount: number;
}

const initialState: PokemonState = {
    pokemons: [],
    pokemonsThatTurned: [],
    offset: 0,
    totalCount: 0,
};

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        populatePokemons: (state, action: PayloadAction<Pokemon[]>) => {
            state.pokemons = [...state.pokemons, ...action.payload];
        },
        turnPokemon: (state, action: PayloadAction<string>) => {
            state.pokemonsThatTurned = [
                ...state.pokemonsThatTurned,
                action.payload,
            ];
        },
        increaseOffsetBy: (state, action: PayloadAction<number>) => {
            state.offset += action.payload;
        },
        setTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload;
        },
    },
});

export const {
    populatePokemons,
    turnPokemon,
    increaseOffsetBy,
    setTotalCount,
} = pokemonSlice.actions;

export const selectPokemons = (state: RootState) => state.pokemon.pokemons;

export default pokemonSlice.reducer;
