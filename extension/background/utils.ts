import { browser, Tabs } from 'webextension-polyfill-ts';

export const getAvailableUberEatsTab = async (): Promise<
    Tabs.Tab | undefined
> => {
    const tabs = await browser.tabs.query({
        url: ['https://www.ubereats.com/*'],
    });

    return tabs.reduce<Tabs.Tab | undefined>((res, tab) => {
        if (typeof tab.id === 'number') return tab;
        return res;
    }, undefined);
};

export const sendMessageToAll = async (message: {
    action: string;
    data?: any;
}): Promise<void> => {
    const currentTab = await getAvailableUberEatsTab();
    if (currentTab && currentTab.id)
        browser.tabs.sendMessage(currentTab.id, message);
    browser.runtime.sendMessage(message);
};

export const getUserUUIDFromCookie = (cookie: string): string | false => {
    return cookie.split(';').reduce<false | string>((res, cur) => {
        const matches = cur.trim().match(/^_userUuid=(.*)$/);
        if (matches && matches.length === 2) return matches[1];
        return res;
    }, false);
};
