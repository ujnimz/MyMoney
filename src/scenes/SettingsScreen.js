import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '_theme/ThemeContext';
import ColorCard from '_theme/ColorCard';
import ThemeSwitch from '_components/atoms/ThemeSwitch';
import FormButton from '_components/atoms/FormButton';
import AlertPopup from '_components/atoms/AlertPopup';

// REDUX
import {connect} from 'react-redux';
import {logoutUser} from '_redux/actions/auth';
import {getUser} from '_redux/actions/user';

const loaderImage = require('_assets/loading.gif');

const SettingsScreen = ({
  navigation,
  authState,
  userState,
  logoutUser,
  getUser,
}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const {isLoading, userData} = userState;

  // Show or hide alert popup
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getUser();
    return () => {
      setShowAlert(false);
    };
  }, []);

  // Show alert poup
  const showDialog = () => {
    return setShowAlert(true);
  };
  // Hide alert popup
  const handleCancel = () => {
    return setShowAlert(false);
  };
  // Logout user
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.avatar}>
          {isLoading || !userData || userData.image === '' ? (
            <Ionicons
              name='person-outline'
              color={colors.primary.content}
              size={60}
            />
          ) : (
            <Image
              style={styles.image}
              source={{uri: userData.image}}
              loadingIndicatorSource={loaderImage}
            />
          )}
        </View>
        <Text style={styles.username}>
          {isLoading || !userData ? '...' : userData.name}
        </Text>
      </View>

      <View style={styles.body}>
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
              onPress={() => navigation.navigate('DangerousZone')}
            >
              <Text style={styles.label}>Dangerous Zone</Text>
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
      </View>

      <FormButton
        text='Logout'
        bgColor={colors.primary.main}
        textColor={colors.primary.content}
        isAnimating={isLoading}
        onPress={() => showDialog()}
      />

      <AlertPopup
        visible={showAlert}
        title='Logout'
        message='Are you sure you want to logout from MyMoney App?'
        handleCancel={handleCancel}
        handleOk={handleLogout}
        okLabel='Logout'
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
      backgroundColor: colors.background.main,
    },
    hero: {
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    body: {
      padding: 15,
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
      overflow: 'hidden',
    },
    image: {
      height: 100,
      width: 100,
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
  userState: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authState: state.authState,
  userState: state.userState,
});

export default connect(mapStateToProps, {logoutUser, getUser})(SettingsScreen);
