import { USER_UUID_KEY } from '../constants';

export default function isLoggedIn(): boolean {
    return !!localStorage.getItem(USER_UUID_KEY);
}
