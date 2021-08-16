import { browser } from 'webextension-polyfill-ts';

export default async function login(): Promise<boolean> {
    return browser.runtime.sendMessage({ action: 'LOGIN' });
}
