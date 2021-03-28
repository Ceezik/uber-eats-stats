import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { selectSettings } from './selectors';
import { sliceKey, reducer, actions } from './slice';
import listenForSID from '../../../listeners/SIDListener';
import getSID from '../../../services/chromeMessaging/getSID';

export function SettingsState(): JSX.Element {
    useInjectReducer({ key: sliceKey, reducer });
    const dispatch = useDispatch();
    const { sid } = useSelector(selectSettings);

    const storeSID = (sid?: string) =>
        dispatch(actions.setSettingsState({ sid }));

    useEffect(() => {
        getSID().then(storeSID);
        listenForSID(storeSID);
    }, []);

    return <p>sid: {sid}</p>;
}
