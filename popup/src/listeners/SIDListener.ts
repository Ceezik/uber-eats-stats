import { browser } from "webextension-polyfill-ts";

export default function listenForSID(callback: (data: string) => void) {
  browser.runtime.onMessage.addListener(
    (message: { action: string; data: any }) => {
      if (message.action === "SET_SID") callback(message.data);
    }
  );
}
