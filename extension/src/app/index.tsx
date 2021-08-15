import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Provider } from 'react-redux';
import configureAppStore from '../store/configureStore';
import { ShowStatsButton } from './components/ShowStatsButton';
import useSettings from '../hooks/useSettings';

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
    const { showStats, isLoggedIn } = useSettings();

    return (
        <>
            {showStats && isLoggedIn && <div>show stats modal</div>}

            <h1>Uber eats stats</h1>
            {isLoggedIn && <ShowStatsButton />}
        </>
    );
}
