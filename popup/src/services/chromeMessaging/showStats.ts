import { browser } from 'webextension-polyfill-ts';

export default async function showStats(): Promise<boolean> {
    return browser.runtime.sendMessage({ action: 'SHOW_STATS' });
}
