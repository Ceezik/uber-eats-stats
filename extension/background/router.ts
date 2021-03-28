import isLoggedIn from './chromeMessaging/isLoggedIn';

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
        })();
        return true;
    }
);
