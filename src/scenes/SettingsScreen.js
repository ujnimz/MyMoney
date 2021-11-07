import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '_theme/ThemeContext';
import ColorCard from '_theme/ColorCard';
import ThemeSwitch from '_components/atoms/ThemeSwitch';
import TextButton from '_components/atoms/TextButton';
// REDUX
import {connect} from 'react-redux';
import {logoutUser} from '_redux/actions/auth';

const SettingsScreen = ({navigation, authState, logoutUser}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const {isLoading} = authState;

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Ionicons
            name='person-outline'
            color={colors.primary.content}
            size={60}
          />
        </View>
        <Text style={styles.username}>Ujith Nimantha</Text>
      </View>

      <ColorCard backgroundColor={colors.surface.focus}>
        <View style={styles.section}>
          <Text style={styles.label}>Dark Theme</Text>
          <ThemeSwitch />
        </View>
      </ColorCard>

      <ColorCard backgroundColor={colors.surface.focus}>
        <View>
          <TouchableOpacity
            style={styles.section}
            onPress={() => navigation.navigate('Categories')}
          >
            <Text style={styles.label}>Categories</Text>
            <Ionicons
              name='chevron-forward'
              color={colors.text.main}
              size={30}
            />
          </TouchableOpacity>
          <View style={styles.sectionDivider}></View>
          <TouchableOpacity
            style={styles.section}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.label}>Profile Settings</Text>
            <Ionicons
              name='chevron-forward'
              color={colors.text.main}
              size={30}
            />
          </TouchableOpacity>
          <View style={styles.sectionDivider}></View>
          <TouchableOpacity
            style={styles.section}
            onPress={() => navigation.navigate('TermsAndConditions')}
          >
            <Text style={styles.label}>Terms and Conditions</Text>
            <Ionicons
              name='chevron-forward'
              color={colors.text.main}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </ColorCard>

      <TextButton
        text='Logout'
        bgColor={colors.primary.main}
        textColor={colors.primary.content}
        isAnimating={isLoading}
        onPress={() => logoutUser()}
      />
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      padding: 15,
      backgroundColor: colors.background.main,
    },
    hero: {
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      //backgroundColor: 'red',
    },
    avatar: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      width: 100,
      borderRadius: 100,
      marginBottom: 10,
      backgroundColor: colors.primary.main,
    },
    label: {
      fontSize: 14,
      color: colors.text.main,
    },
    username: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text.main,
    },
    sectionDivider: {
      height: 1,
      backgroundColor: colors.black.main,
    },
  });

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authState: state.authState,
});

export default connect(mapStateToProps, {logoutUser})(SettingsScreen);
