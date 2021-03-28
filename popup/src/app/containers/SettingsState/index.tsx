import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { selectSettings } from './selectors';
import { sliceKey, reducer, actions } from './slice';
import { authListener } from '../../../listeners';
import { isLoggedIn } from '../../../services/chromeMessaging';

export function SettingsState(): JSX.Element {
    useInjectReducer({ key: sliceKey, reducer });
    const dispatch = useDispatch();
    const { isLoggedIn: loggedIn } = useSelector(selectSettings);

    const storeAuthState = (loggedIn: boolean) =>
        dispatch(actions.setSettingsState({ isLoggedIn: loggedIn }));

    useEffect(() => {
        isLoggedIn().then(storeAuthState);
        authListener(storeAuthState);
    }, []);

    return <p>isLoggedIn: {loggedIn.toString()}</p>;
}
