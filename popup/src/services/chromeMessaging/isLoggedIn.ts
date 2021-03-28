import { browser } from 'webextension-polyfill-ts';

export default async function isLoggedIn(): Promise<boolean> {
    return browser.runtime.sendMessage({ action: 'IS_LOGGED_IN' });
}
