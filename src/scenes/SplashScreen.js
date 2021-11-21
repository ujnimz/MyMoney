import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppNavTabs from '_navigations/AppNavTabs';
import AuthNavStack from '_navigations/AuthNavStack';
import RootStack from '_navigations/RootStack';
import LoadingScreen from '_scenes/LoadingScreen';
// REDUX
import {connect} from 'react-redux';
import {authStatus} from '_redux/actions/auth';
import {getCurrentTime} from '_redux/actions/time';

const SplashScreen = ({authState, authStatus, getCurrentTime}) => {
  const {isInitializing, user} = authState;

  useEffect(() => {
    authStatus();
    getCurrentTime();
  }, [isInitializing]);

  if (isInitializing) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthNavStack />;
  }

  return <RootStack />;
};

SplashScreen.propTypes = {
  authState: PropTypes.object.isRequired,
  authStatus: PropTypes.func.isRequired,
  getCurrentTime: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authState: state.authState,
});

export default connect(mapStateToProps, {authStatus, getCurrentTime})(
  SplashScreen,
);
