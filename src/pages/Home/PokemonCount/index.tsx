import { FunctionComponent } from 'react';
import * as S from './styles';

type Props = {
    count: number;
    totalCount: number;
};

const PokemonCount: FunctionComponent<Props> = ({ count, totalCount }) => {
    return (
        <S.PokemonCount>
            Pokémons: <span>{count}</span> of <span>{totalCount}</span>
        </S.PokemonCount>
    );
};

export default PokemonCount;
