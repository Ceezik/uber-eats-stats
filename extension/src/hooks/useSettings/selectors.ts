import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state?.useSettings || initialState;

export const selectUseSettings = createSelector(
    [selectDomain],
    (useSettingsState) => useSettingsState
);
