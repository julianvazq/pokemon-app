import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        background: {
            default: '#f2f2f2',
            paper: '#ededed',
        },
        primary: {
            main: '#367c2b',
        },
        secondary: {
            main: '#f2f2f2',
            light: '#ededed',
            dark: '#e0e0e0',
        },
        error: {
            main: '#c21020',
        },
    },
});
