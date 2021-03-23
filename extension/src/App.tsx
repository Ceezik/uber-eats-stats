import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

const mainContent = document.querySelector('#main-content > div');

export default function App(): JSX.Element {
    const portalElement = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        mainContent?.prepend(portalElement);

        return () => {
            mainContent?.removeChild(portalElement);
        };
    }, [portalElement]);

    return mainContent ? (
        createPortal(<h1>Uber eats stats</h1>, portalElement)
    ) : (
        <></>
    );
}
