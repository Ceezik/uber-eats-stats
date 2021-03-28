import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Provider } from 'react-redux';
import configureAppStore from '../store/configureStore';
import { SettingsState } from './containers/SettingsState';

const mainContent = document.querySelector('#main-content > div');
const store = configureAppStore();

export default function App(): JSX.Element {
    const portalElement = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        mainContent?.prepend(portalElement);

        return () => {
            mainContent?.removeChild(portalElement);
        };
    }, [portalElement]);

    return (
        <Provider store={store}>
            {mainContent &&
                createPortal(
                    <>
                        <SettingsState />
                        <h1>Uber eats stats</h1>
                    </>,
                    portalElement
                )}
        </Provider>
    );
}
