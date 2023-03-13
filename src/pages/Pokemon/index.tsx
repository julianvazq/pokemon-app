import { Card, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PokemonDetails from './PokemonDetails';
import PokemonImage from './PokemonImage';

const PokemonPage = () => {
    const { pokemonName } = useParams();
    const { pokemons } = useAppSelector((state) => state.pokemon);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const pokemon = pokemons.find((p) => p.name === pokemonName);
    console.log('pokemon', pokemon);

    // useEffect(() => {
    //     (async () => {
    //         await PokemonClient.getPokemonByName(pokemonName!)
    //             .then((data) => {
    //                 // setPokemon(data);
    //                 console.log(data);
    //             })
    //             .catch((error) => {
    //                 navigate('/');
    //                 console.error(error);
    //             });
    //     })();
    // }, [pokemonName]);

    if (!pokemon) {
        return <div>What pokemon is that</div>;
    }

    return (
        <Card style={{ backgroundColor: '#ffffff' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={4} md={4}>
                    <PokemonImage
                        src={
                            (pokemon.sprites.front_shiny ||
                                pokemon.sprites.front_default)!
                        }
                        name={pokemon.name}
                    />
                </Grid>
                <Grid item xs={12} sm md>
                    <PokemonDetails pokemon={pokemon} />
                </Grid>
            </Grid>
        </Card>
    );
};

export default PokemonPage;
