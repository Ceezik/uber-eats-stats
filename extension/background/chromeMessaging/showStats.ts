import { browser } from 'webextension-polyfill-ts';
import { goTo, openOrFocusUberEatsTab } from '../utils';

export default async function showStats(): Promise<boolean> {
    const tab = await openOrFocusUberEatsTab();
    if (!tab.id) return false;
    await goTo({ tabId: tab.id, url: 'https://www.ubereats.com/' });
    return browser.tabs.sendMessage(tab.id, { action: 'SHOW_STATS' });
}
