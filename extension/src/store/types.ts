import { AnyAction, Reducer } from '@reduxjs/toolkit';
import { UseSettingsState } from '../hooks/useSettings/types';

export interface RootState {
    useSettings?: UseSettingsState;
}

type RequiredRootState = Required<RootState>;

export type RootStateKeyType = keyof RootState;

export type InjectedReducersType = {
    [P in RootStateKeyType]?: Reducer<RequiredRootState[P], AnyAction>;
};
export interface InjectReducerParams<Key extends RootStateKeyType> {
    key: Key;
    reducer: Reducer<RequiredRootState[Key], AnyAction>;
}
