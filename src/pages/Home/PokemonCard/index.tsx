import { Card, CardHeader, CardMedia } from '@mui/material';
import { Pokemon } from 'pokenode-ts';
import { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../../../theme';

type Props = {
    pokemon: Pokemon;
    hasTurned: boolean;
    onTurnHandler: () => void;
};

const PokemonCard: FunctionComponent<Props> = ({
    pokemon,
    hasTurned,
    onTurnHandler,
}) => {
    const [hovered, setHovered] = useState<boolean>(false);

    const frontImgSrc =
        pokemon.sprites.front_shiny || pokemon.sprites.front_default;
    const backImgSrc =
        pokemon.sprites.back_shiny || pokemon.sprites.back_default;
    const imgSrc = hasTurned ? frontImgSrc : backImgSrc;

    const backgroundColor = hovered
        ? theme.palette.secondary.dark
        : theme.palette.secondary.light;

    return (
        <Link
            to={`/pokemon/${pokemon.name}`}
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => {
                onTurnHandler();
                setHovered(true);
            }}
            onMouseLeave={() => setHovered(false)}
        >
            <Card sx={{ backgroundColor }}>
                <CardMedia
                    component='img'
                    height='100%'
                    image={imgSrc! || frontImgSrc!}
                    alt={pokemon.name}
                    sx={{ backgroundColor: '#ffffff' }}
                />
                <CardHeader
                    title={pokemon.name}
                    titleTypographyProps={{
                        align: 'center',
                        component: 'h3',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                        sx: {
                            backgroundColor,
                        },
                    }}
                />
            </Card>
        </Link>
    );
};

export default PokemonCard;
