import { NamedAPIResource } from 'pokenode-ts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { populatePokemons } from '../../app/pokemon';
import { PokemonClient } from '../../features/pokemon/services/pokemonApi';
import PokemonGrid from './PokemonGrid';

const Home = () => {
    const { pokemons } = useAppSelector((state) => state.pokemon);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const res = await PokemonClient.listPokemons(undefined, 20);
                console.log('pokemons', res);
                const pokemonsBasic = res.results as NamedAPIResource[];
                const pokemonsFull = await Promise.all(
                    pokemonsBasic.map(
                        async (pokemon) =>
                            await PokemonClient.getPokemonByName(pokemon.name)
                    )
                );
                console.log('pokemonsFull', pokemonsFull);
                dispatch(populatePokemons(pokemonsFull));
            } catch (error) {
                console.error(error);
            }
        };
        fetchPokemons();
    }, []);

    return (
        <>
            <PokemonGrid pokemons={pokemons} />
        </>
    );
};

export default Home;
