import { Box, Grid, Typography } from '@mui/material';
import { Pokemon } from 'pokenode-ts';
import { FunctionComponent } from 'react';
import * as S from './styles';

type Props = {
    pokemon: Pokemon;
};

const PokemonDetails: FunctionComponent<Props> = ({ pokemon }) => {
    const types = pokemon.types.map((t) => t.type.name).join(', ');
    return (
        <Box padding={2}>
            <Typography
                variant='h4'
                component='h3'
                fontWeight={600}
                textTransform='capitalize'
            >
                {pokemon.name}
            </Typography>
            <Typography textTransform='capitalize'>{types}</Typography>
            <S.Divider />
            <Typography variant='h6' component='h4'>
                Stats
            </Typography>
            <Grid container spacing={1}>
                {pokemon.stats.map((s) => (
                    <Grid item xs={12} sm={6}>
                        <Typography textTransform='capitalize' fontWeight={600}>
                            {s.stat.name}
                        </Typography>
                        <Typography>{s.base_stat}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PokemonDetails;
