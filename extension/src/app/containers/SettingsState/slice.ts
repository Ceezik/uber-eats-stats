import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContainerState, SettingsState } from './types';

export const initialState: ContainerState = {
    isLoggedIn: false,
    showStats: false,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettingsState(state, action: PayloadAction<Partial<SettingsState>>) {
            return { ...state, ...action.payload };
        },
    },
});

export const { actions, reducer, name: sliceKey } = settingsSlice;
