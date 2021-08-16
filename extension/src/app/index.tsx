import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Provider } from 'react-redux';
import configureAppStore from '../store/configureStore';
import { ShowStatsButton } from './components/ShowStatsButton';
import useSettings from '../hooks/useSettings';
import { urlChanged } from '../listeners';
import { shouldInjectApp } from '../utils/injectApp';
import { LoginButton } from './components/LoginButton';
import { useMemo } from 'react';
import { DOMElementAddedObserver, inject, isElement } from '../utils/injectApp';

const store = configureAppStore();

export default function ConnectedApp(): JSX.Element {
    return (
        <Provider store={store}>
            <InjectedApp />
        </Provider>
    );
}

function InjectedApp(): JSX.Element {
    const [url, setUrl] = useState<string | undefined>(undefined);
    const [readyToInject, setReadyToInject] = useState(false);

    const portalElement = useMemo(() => document.createElement('div'), []);
    const observer = useMemo(
        () =>
            new DOMElementAddedObserver(
                document.body,
                (node) => isElement(node) && node.id === 'main-content',
                () => {
                    inject(portalElement);
                    setReadyToInject(true);
                }
            ),
        []
    );

    useEffect(() => urlChanged(({ url: newUrl }) => setUrl(newUrl)), []);
    useEffect(() => {
        setReadyToInject(false);
        observer.disconnect();

        const successfull = inject(portalElement);
        if (successfull) setReadyToInject(true);
        else {
            observer.observe();
        }

        return () => observer.disconnect();
    }, [url]);

    return (
        <div>
            {readyToInject &&
                shouldInjectApp(url) &&
                createPortal(<App />, portalElement)}
        </div>
    );
}

function App(): JSX.Element {
    const { showStats, isLoggedIn } = useSettings();

    return (
        <>
            {showStats && isLoggedIn && <div>show stats modal</div>}

            <h1>Uber eats stats</h1>
            {isLoggedIn ? <ShowStatsButton /> : <LoginButton />}
        </>
    );
}
