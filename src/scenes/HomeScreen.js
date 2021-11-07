import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '_theme/ThemeContext';
import {StyleSheet, View} from 'react-native';
import GradientBackground from '_theme/GradientBackground';
import Summary from '_components/organisms/Summary';
import Header from '_components/organisms/Header';
import TransactionsModal from '_components/modals/TransactionsModal';
// REDUX
import {connect} from 'react-redux';
import {authStatus} from '_redux/actions/auth';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();
  const styles = useStyles();

  useEffect(() => {
    //authStatus();
  }, []);

  return (
    <GradientBackground
      gradientColors={[
        colors.gradient.start,
        colors.gradient.middle,
        colors.gradient.end,
      ]}
    >
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Summary />
        <TransactionsModal />
      </View>
    </GradientBackground>
  );
};

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
  });

HomeScreen.propTypes = {
  //authState: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  authStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  //authState: state.authState,
});

export default connect(mapStateToProps, {authStatus})(HomeScreen);
