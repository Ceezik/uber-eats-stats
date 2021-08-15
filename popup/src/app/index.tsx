import React from 'react';
import { useSettings } from '../hooks';
import { LoginButton } from './components/LoginButton';
import { ShowStatsButton } from './components/ShowStatsButton';

export default function App(): JSX.Element {
    const { isLoggedIn } = useSettings();

    return (
        <>
            <h1>Uber eats stats popup</h1>
            {isLoggedIn ? <ShowStatsButton /> : <LoginButton />}
        </>
    );
}
