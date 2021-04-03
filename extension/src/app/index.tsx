import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import configureAppStore from '../store/configureStore';
import { ShowStatsButton } from './components/ShowStatsButton';
import { SettingsState } from './containers/SettingsState';
import { selectSettings } from './containers/SettingsState/selectors';

const mainContent = document.querySelector('#main-content > div');
const store = configureAppStore();

export default function ConnectedApp(): JSX.Element {
    const portalElement = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        mainContent?.prepend(portalElement);

        return () => {
            mainContent?.removeChild(portalElement);
        };
    }, [portalElement]);

    return (
        <Provider store={store}>
            {mainContent && createPortal(<App />, portalElement)}
        </Provider>
    );
}

function App(): JSX.Element {
    const { showStats, isLoggedIn } = useSelector(selectSettings);

    return (
        <>
            {showStats && isLoggedIn && <div>show stats modal</div>}

            <SettingsState />
            <h1>Uber eats stats</h1>
            {isLoggedIn && <ShowStatsButton />}
        </>
    );
}
