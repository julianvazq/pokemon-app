// Original api documentation
// https://pokeapi.co/docs/v2#pokemon

// ts wrapper
// https://github.com/Gabb-c/pokenode-ts
import { NamedAPIResource, PokemonClient } from 'pokenode-ts';
import { PokemonList } from '../types/pokemonTypes';

const listPokemonsByName = (pokemonNames: string[]) => {
    return Promise.all(
        pokemonNames.map(
            async (pokemonName) =>
                await ExtPokemonClient.getPokemonByName(pokemonName)
        )
    );
};

/**
 * @description Enhancement of 'listPokemons', returns Pokemon[] instead of NamedAPIResource[]
 * @param offset The first item that you will get
 * @param limit How many Pokemons Stats per page
 * @returns A list of complete Pokemon entities
 */
const listFullPokemons = async (
    offset?: number | undefined,
    limit?: number | undefined
): Promise<PokemonList> => {
    /* Get pokemon names and pagination data */
    const { count, next, previous, results } =
        await ExtPokemonClient.listPokemons(offset, limit);
    const pokemonNames = (results as NamedAPIResource[]).map((p) => p.name);
    /* Get full pokemon data and merge with pagination data */
    return listPokemonsByName(pokemonNames).then(
        (pokemons) =>
            ({
                count,
                next,
                previous,
                results: pokemons,
            } as PokemonList)
    );
};

class PKClient extends PokemonClient {
    listFullPokemons = listFullPokemons;
}

export const ExtPokemonClient = new PKClient();
