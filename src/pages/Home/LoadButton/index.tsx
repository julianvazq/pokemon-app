import { Button, CircularProgress } from '@mui/material';
import { FunctionComponent } from 'react';

type Props = {
    loading: boolean;
    onClickHandler: () => void;
};

const LoadButton: FunctionComponent<Props> = ({ loading, onClickHandler }) => {
    if (loading) {
        return <CircularProgress title='Loading...' />;
    }

    return (
        <Button variant='contained' onClick={onClickHandler}>
            Load more
        </Button>
    );
};

export default LoadButton;
