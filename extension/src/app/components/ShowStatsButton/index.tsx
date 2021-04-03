import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../containers/SettingsState/slice';

export function ShowStatsButton(): JSX.Element {
    const dispatch = useDispatch();

    const setShowStats = () => {
        dispatch(actions.setSettingsState({ showStats: true }));
    };

    return <button onClick={setShowStats}>show stats</button>;
}
