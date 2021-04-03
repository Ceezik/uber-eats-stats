import { browser } from 'webextension-polyfill-ts';

export default function showStatsListener(callback: () => void) {
    browser.runtime.onMessage.addListener(
        (message: { action: string; data?: any }) => {
            if (message.action === 'SHOW_STATS') callback();
        }
    );
}
