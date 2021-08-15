import { browser } from 'webextension-polyfill-ts';
import { openOrFocusUberEatsTab } from '../utils';

export default async function login(): Promise<boolean> {
    const tab = await openOrFocusUberEatsTab();
    if (!tab.id) return false;
    return !!browser.tabs.update(tab.id, {
        url: 'https://auth.uber.com/login/',
    });
}
