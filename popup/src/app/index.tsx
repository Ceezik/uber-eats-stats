import React from 'react';
import { useSelector } from 'react-redux';
import { ShowStatsButton } from './components/ShowStatsButton';
import { SettingsState } from './containers/SettingsState/index';
import { selectSettings } from './containers/SettingsState/selectors';

export default function App(): JSX.Element {
    const { isLoggedIn } = useSelector(selectSettings);

    return (
        <>
            <SettingsState />
            <h1>Uber eats stats popup</h1>
            {isLoggedIn && <ShowStatsButton />}
        </>
    );
}
