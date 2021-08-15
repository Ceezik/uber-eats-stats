import React from 'react';
import { login } from '../../../services/chromeMessaging';

export function LoginButton(): JSX.Element {
    const handleLogin = async () => {
        const successfull = await login();
        if (successfull) window.close();
    };

    return <button onClick={handleLogin}>Login to Uber eats</button>;
}
