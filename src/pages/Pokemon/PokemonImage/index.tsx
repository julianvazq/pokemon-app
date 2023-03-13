import { FunctionComponent } from 'react';
import { theme } from '../../../theme';
import * as S from './styles';

type Props = {
    name: string;
    src: string;
};

const PokemonImage: FunctionComponent<Props> = ({ name, src }) => {
    return (
        <S.Image
            src={src}
            alt={name}
            style={{ backgroundColor: theme.palette.secondary.dark }}
        />
    );
};

export default PokemonImage;
