import { browser } from 'webextension-polyfill-ts';

browser.webRequest.onSendHeaders.addListener(
    (details) => {
        const cookieHeader = details.requestHeaders?.find(
            (header) => header.name === 'Cookie'
        )?.value;
        if (cookieHeader) {
            const sid = cookieHeader
                .split(';')
                .reduce<false | string>((res, cur) => {
                    const matches = cur.trim().match(/^sid=(.*)$/);
                    if (matches && matches.length === 2) return matches[1];
                    return res;
                }, false);
            console.log(sid);
        }
        return details;
    },
    { urls: ['<all_urls>'] },
    ['extraHeaders', 'requestHeaders']
);
