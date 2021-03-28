import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { SettingsState } from "../app/containers/SettingsState/types";

export interface RootState {
  settings?: SettingsState;
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
