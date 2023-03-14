import { NamedAPIResourceList, Pokemon } from 'pokenode-ts';

export interface PokemonList extends Omit<NamedAPIResourceList, 'results'> {
    results: Pokemon[];
}
