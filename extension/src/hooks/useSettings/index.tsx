import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { selectUseSettings } from './selectors';
import { sliceKey, reducer, actions } from './slice';
import { authListener, showStatsListener } from '../../listeners';
import { isLoggedIn } from '../../services/chromeMessaging';
import { ContainerState } from './types';

export default function useSettings(): ContainerState & {
    setShowStats: () => void;
} {
    useInjectReducer({ key: sliceKey, reducer });
    const dispatch = useDispatch();
    const useSettingsState = useSelector(selectUseSettings);

    const storeAuthState = (loggedIn: boolean) =>
        dispatch(actions.setState({ isLoggedIn: loggedIn }));

    const setShowStats = (): void => {
        dispatch(actions.setState({ showStats: true }));
    };

    useEffect(() => {
        isLoggedIn().then(storeAuthState);
        authListener(storeAuthState);
        showStatsListener(setShowStats);
    }, []);

    return { ...useSettingsState, setShowStats };
}
