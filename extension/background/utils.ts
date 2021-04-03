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

export const focusUberEatsTab = async (): Promise<Tabs.Tab | undefined> => {
    const currentTab = await getAvailableUberEatsTab();
    if (currentTab && currentTab.id) {
        browser.tabs.update(currentTab.id, { active: true });
        return currentTab;
    }
    return undefined;
};

export const openUberEatsTab = async (): Promise<Tabs.Tab> => {
    const newTab = await browser.tabs.create({
        active: true,
        url: 'https://ubereats.com',
    });
    return new Promise((resolve) => {
        const listener = (
            tabId: number,
            changeInfo: Tabs.OnUpdatedChangeInfoType
        ) => {
            if (tabId === newTab.id && changeInfo.status === 'complete') {
                browser.tabs.onUpdated.removeListener(listener);
                return resolve(newTab);
            }
        };
        browser.tabs.onUpdated.addListener(listener);
    });
};

export const openOrFocusUberEatsTab = async (): Promise<Tabs.Tab> => {
    const currentTab = await focusUberEatsTab();
    return currentTab || openUberEatsTab();
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
