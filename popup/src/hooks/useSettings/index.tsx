import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { selectUseSettings } from './selectors';
import { sliceKey, reducer, actions } from './slice';
import { isLoggedIn } from '../../services/chromeMessaging';
import { ContainerState } from './types';
import { authListener } from '../../listeners';

export default function useSettings(): ContainerState {
    useInjectReducer({ key: sliceKey, reducer });
    const dispatch = useDispatch();
    const useSsettingsState = useSelector(selectUseSettings);

    const storeAuthState = (loggedIn: boolean) =>
        dispatch(actions.setState({ isLoggedIn: loggedIn }));

    useEffect(() => {
        isLoggedIn().then(storeAuthState);
        authListener(storeAuthState);
    }, []);

    return useSsettingsState;
}
