import styled from '@emotion/styled';
import { Box as MUIBox } from '@mui/material';

export const Box = styled(MUIBox)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    &:first-of-type {
        align-self: flex-start;
    }
`;
