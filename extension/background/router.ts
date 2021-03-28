import getSID from './chromeMessaging/getSID';

chrome.runtime.onMessage.addListener(
    (
        message: { action: string; data: any },
        sender: any,
        sendResponse: (data: any) => void
    ) => {
        if (message.action === 'GET_SID') {
            return sendResponse(getSID());
        }
        return true;
    }
);
