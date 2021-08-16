import { browser } from 'webextension-polyfill-ts';
import { UBER_EATS_API_URL, USER_UUID_KEY } from '../constants';
import { sendMessageToAll, getUserUUIDFromCookie } from '../utils';

browser.webRequest.onSendHeaders.addListener(
    async (details) => {
        const cookieHeader = details.requestHeaders?.find(
            (header) => header.name === 'Cookie'
        )?.value;
        if (cookieHeader) {
            const userUUID = getUserUUIDFromCookie(cookieHeader);
            const oldUserUUID = localStorage.getItem(USER_UUID_KEY);

            if (userUUID && !oldUserUUID) {
                localStorage.setItem(USER_UUID_KEY, userUUID);
                sendMessageToAll({ action: 'LOGIN' });
            } else if (!userUUID && oldUserUUID) {
                localStorage.removeItem(USER_UUID_KEY);
                sendMessageToAll({ action: 'LOGOUT' });
            }
        }
        return details;
    },
    { urls: [`${UBER_EATS_API_URL}/*`] },
    ['extraHeaders', 'requestHeaders']
);
