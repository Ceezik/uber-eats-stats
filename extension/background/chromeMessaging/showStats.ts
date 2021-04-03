import { browser } from 'webextension-polyfill-ts';
import { openOrFocusUberEatsTab } from '../utils';

export default async function showStats(): Promise<boolean> {
    const tab = await openOrFocusUberEatsTab();
    if (!tab.id) return false;
    return browser.tabs.sendMessage(tab.id, { action: 'SHOW_STATS' });
}
