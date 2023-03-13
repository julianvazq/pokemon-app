import { Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import * as S from './styles';

const AppHeader = () => {
    const { pathname } = useLocation();
    const isIndex = pathname === '/';
    const title = 'Shiny Pokédex';
    const subtitle =
        'Hover over a Pokémon for it to greet you, and click to see its Pokédex entry.';

    return (
        <S.Card>
            <Typography variant='h3' component='h1' fontWeight={600}>
                {title}
            </Typography>
            {isIndex ? (
                <Typography variant='h6' component='h2'>
                    {subtitle}
                </Typography>
            ) : (
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <Typography variant='h6' component='h2'>
                        Back to all Pokémons
                    </Typography>
                </Link>
            )}
        </S.Card>
    );
};

export default AppHeader;
