import { showStats, isLoggedIn } from './chromeMessaging';

chrome.runtime.onMessage.addListener(
    (
        message: { action: string; data: any },
        sender: any,
        sendResponse: (data: any) => void
    ) => {
        (async (): Promise<any> => {
            if (message.action === 'IS_LOGGED_IN') {
                return sendResponse(isLoggedIn());
            }
            if (message.action === 'SHOW_STATS') {
                return sendResponse(showStats());
            }
        })();
        return true;
    }
);
