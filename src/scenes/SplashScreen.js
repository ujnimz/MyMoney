import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import AuthNavStack from '_navigations/AuthNavStack';
import RootStack from '_navigations/RootStack';
import LoadingScreen from '_scenes/LoadingScreen';
// REDUX
import {connect} from 'react-redux';
import {authStatus} from '_redux/actions/auth';
import {getCurrentTime} from '_redux/actions/time';
import {getLatestRates} from '_redux/actions/rates';

const SplashScreen = ({
  authState,
  authStatus,
  getCurrentTime,
  getLatestRates,
}) => {
  const {isInitializing, user} = authState;

  useEffect(() => {
    authStatus();
    getCurrentTime();
    //getLatestRates();
  }, [isInitializing]);

  if (isInitializing) {
    return <LoadingScreen />;
  }
  //console.log(user);
  if (!user) {
    return <AuthNavStack />;
  }

  return <RootStack />;
};

SplashScreen.propTypes = {
  authState: PropTypes.object.isRequired,
  authStatus: PropTypes.func.isRequired,
  getCurrentTime: PropTypes.func.isRequired,
  getLatestRates: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authState: state.authState,
});

export default connect(mapStateToProps, {
  authStatus,
  getCurrentTime,
  getLatestRates,
})(SplashScreen);
