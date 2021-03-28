import { browser } from 'webextension-polyfill-ts';
import dayjs from 'dayjs';
import { SID_KEY, SID_FETCH_DATE_KEY } from '../constants';
import { sendMessageToAll } from '../utils';

const getSIDFromCookie = (cookie: string): string | false => {
    return cookie.split(';').reduce<false | string>((res, cur) => {
        const matches = cur.trim().match(/^sid=(.*)$/);
        if (matches && matches.length === 2) return matches[1];
        return res;
    }, false);
};

browser.webRequest.onSendHeaders.addListener(
    async (details) => {
        const cookieHeader = details.requestHeaders?.find(
            (header) => header.name === 'Cookie'
        )?.value;
        if (cookieHeader) {
            const sid = getSIDFromCookie(cookieHeader);
            const lastSIDFetchDate = localStorage.getItem(SID_FETCH_DATE_KEY);

            if (
                sid !== false &&
                (!lastSIDFetchDate ||
                    dayjs().isAfter(dayjs(lastSIDFetchDate).add(1, 'd')))
            ) {
                localStorage.setItem(SID_KEY, sid);
                localStorage.setItem(SID_FETCH_DATE_KEY, new Date().toString());
                sendMessageToAll({ action: 'SET_SID', data: sid });
            }
        }
        return details;
    },
    { urls: ['<all_urls>'] },
    ['extraHeaders', 'requestHeaders']
);
