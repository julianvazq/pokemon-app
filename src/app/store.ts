// Unpublished Work © 2021 - 2022 Deere & Company

import {
    Action,
    combineReducers,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import { pokemonSlice } from './pokemon';

const rootReducer = combineReducers({
    pokemon: pokemonSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
