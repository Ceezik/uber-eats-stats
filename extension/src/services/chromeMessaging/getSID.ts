import { browser } from 'webextension-polyfill-ts';

export default async function getSID(): Promise<string | undefined> {
    return browser.runtime.sendMessage({ action: 'GET_SID' });
}
