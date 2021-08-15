import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContainerState } from './types';

export const initialState: ContainerState = {
    isLoggedIn: false,
    showStats: false,
};

const useSettingsSlice = createSlice({
    name: 'useSettings',
    initialState,
    reducers: {
        setState(state, action: PayloadAction<Partial<ContainerState>>) {
            return { ...state, ...action.payload };
        },
    },
});

export const { actions, reducer, name: sliceKey } = useSettingsSlice;
