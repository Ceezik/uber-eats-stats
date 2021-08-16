import { browser } from 'webextension-polyfill-ts';

export default function urlChanged(callback: (data: { url: string }) => void) {
    browser.runtime.onMessage.addListener(
        (message: { action: string; data?: any }) => {
            if (message.action === 'URL_CHANGED') callback(message.data);
        }
    );
}
