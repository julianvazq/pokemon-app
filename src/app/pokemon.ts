import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';
import type { RootState } from './store';

interface PokemonState {
    pokemons: Pokemon[];
}

const initialState: PokemonState = {
    pokemons: [],
};

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        populatePokemons: (state, action: PayloadAction<Pokemon[]>) => {
            state.pokemons = [...state.pokemons, ...action.payload];
        },
    },
});

export const { populatePokemons } = pokemonSlice.actions;

export const selectPokemons = (state: RootState) => state.pokemon.pokemons;

export default pokemonSlice.reducer;
