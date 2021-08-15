import React from 'react';
import { useSettings } from '../../../hooks';

export function ShowStatsButton(): JSX.Element {
    const { setShowStats } = useSettings();

    return <button onClick={setShowStats}>show stats</button>;
}
