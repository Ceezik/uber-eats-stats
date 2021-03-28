import { SID_KEY } from '../constants';

export default function getSID(): string | null {
    return localStorage.getItem(SID_KEY);
}
