import { browser } from 'webextension-polyfill-ts';
import { isUberEatsUrl } from '../utils';

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && isUberEatsUrl(tab.url)) {
        browser.tabs.sendMessage(tabId, {
            action: 'URL_CHANGED',
            data: { url: tab.url },
        });
    }
});
