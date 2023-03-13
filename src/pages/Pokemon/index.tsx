import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PokemonClient } from '../../features/pokemon/services/pokemonApi';

const PokemonPage = () => {
    const { pokemonName } = useParams();
    const { pokemons } = useAppSelector((state) => state.pokemon);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    // const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    const pokemon = pokemons.find((p) => p.name === pokemonName);

    useEffect(() => {
        (async () => {
            await PokemonClient.getPokemonByName(pokemonName!)
                .then((data) => {
                    // setPokemon(data);
                    console.log(data);
                })
                .catch((error) => {
                    navigate('/');
                    console.error(error);
                });
        })();
    }, [pokemonName]);

    if (!pokemon) {
        return <div>What pokemon is that</div>;
    }

    return <div>{pokemon.name}</div>;
};

export default PokemonPage;
