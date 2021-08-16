import React from 'react';
import { login } from '../../../services/chromeMessaging';

export function LoginButton(): JSX.Element {
    const handleLogin = async () => {
        await login();
    };

    return <button onClick={handleLogin}>Login to Uber eats</button>;
}
