import React from 'react';
import { showStats } from '../../../services/chromeMessaging';

export function ShowStatsButton(): JSX.Element {
    const handleShowStats = async () => {
        const successfull = await showStats();
        if (successfull) window.close();
    };

    return <button onClick={handleShowStats}>show stats</button>;
}
