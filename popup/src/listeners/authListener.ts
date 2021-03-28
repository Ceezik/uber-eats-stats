import { browser } from 'webextension-polyfill-ts';

export default function authListener(callback: (data: boolean) => void) {
    browser.runtime.onMessage.addListener(
        (message: { action: string; data?: any }) => {
            if (message.action === 'LOGIN') callback(true);
            if (message.action === 'LOGOUT') callback(false);
        }
    );
}
