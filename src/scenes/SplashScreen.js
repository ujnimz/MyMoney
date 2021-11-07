import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppNavTabs from '_navigations/AppNavTabs';
import AuthNavStack from '_navigations/AuthNavStack';
import LoadingScreen from '_scenes/LoadingScreen';
// REDUX
import {connect} from 'react-redux';
import {authStatus} from '_redux/actions/auth';

const SplashScreen = ({authState, authStatus}) => {
  const {isInitializing, user} = authState;

  useEffect(() => {
    authStatus();
  }, [isInitializing]);

  if (isInitializing) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthNavStack />;
  }

  return <AppNavTabs />;
};

SplashScreen.propTypes = {
  authState: PropTypes.object.isRequired,
  authStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authState: state.authState,
});

export default connect(mapStateToProps, {authStatus})(SplashScreen);
