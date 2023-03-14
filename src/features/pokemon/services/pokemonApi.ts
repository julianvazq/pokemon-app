// Original api documentation
// https://pokeapi.co/docs/v2#pokemon

// ts wrapper
// https://github.com/Gabb-c/pokenode-ts
import { NamedAPIResource, Pokemon, PokemonClient } from 'pokenode-ts';

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
): Promise<Pokemon[]> => {
    const res = await ExtPokemonClient.listPokemons(offset, limit);
    const pokemonNames = (res.results as NamedAPIResource[]).map((p) => p.name);
    const pokemons = listPokemonsByName(pokemonNames);
    return pokemons;
};

class PKClient extends PokemonClient {
    listFullPokemons = listFullPokemons;
}

export const ExtPokemonClient = new PKClient();
