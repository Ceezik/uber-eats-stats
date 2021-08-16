import { UBER_EATS_LOGIN_URL } from '../constants';
import { goTo, openOrFocusUberEatsTab } from '../utils';

export default async function login(): Promise<boolean> {
    const tab = await openOrFocusUberEatsTab();
    if (!tab.id) return false;
    return !!goTo({ tabId: tab.id, url: UBER_EATS_LOGIN_URL });
}
