import React from 'react';
import { showStats } from '../../../services/chromeMessaging';

export function ShowStatsButton(): JSX.Element {
    return <button onClick={showStats}>show stats</button>;
}
