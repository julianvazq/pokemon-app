import { createTheme } from '@mui/material/styles';

// A custom theme for this app
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
            main: '#ffde00',
        },
        error: {
            main: '#c21020',
        },
    },
});
