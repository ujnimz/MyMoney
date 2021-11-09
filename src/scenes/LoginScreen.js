import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import FormButton from '_components/atoms/FormButton';
import Logo from '_components/atoms/Logo';
import FormTextInput from '_components/atoms/FormTextInput';
// REDUX
import {connect} from 'react-redux';
import {loginUser, authStatus} from '_redux/actions/auth';

const LoginScreen = ({navigation, loginUser, authStatus, authState}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const {isLoading, userEmail} = authState;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    //authStatus();
    if (userEmail) {
      setEmail(userEmail);
    } else {
      setEmail('');
    }
    return () => {
      setEmail('');
    };
  }, []);

  const handleLogin = () => {
    loginUser({email, password});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Logo color={colors.black.content} />
            <ActivityIndicator
              size='small'
              color={colors.primary.content}
              animating={isLoading}
            />
          </View>

          <View style={styles.form}>
            {userEmail ? (
              <View style={styles.greeting}>
                <Text
                  style={[
                    styles.greetingText,
                    {fontSize: 20, fontWeight: '500'},
                  ]}
                >
                  Welcome!
                </Text>
                <Text style={styles.greetingText}>
                  Registration completed. Let's manage your money. Login with
                  your password.
                </Text>
              </View>
            ) : (
              <View style={styles.greeting}>
                <Text
                  style={[
                    styles.greetingText,
                    {fontSize: 20, fontWeight: '500'},
                  ]}
                >
                  Hello!
                </Text>
                <Text style={styles.greetingText}>
                  Let's manage your money. Login with your password.
                </Text>
              </View>
            )}

            <FormTextInput
              value={email}
              onChangeText={val => setEmail(val)}
              name='email'
              placeholder='Email'
              textContentType='emailAddress'
              autoCapitalize='none'
              keyboardType='email-address'
            />
            <FormTextInput
              value={password}
              onChangeText={val => setPassword(val)}
              name='password'
              placeholder='Password'
              textContentType='newPassword'
              secureTextEntry={true}
            />
            <FormButton
              text='Login'
              bgColor={colors.surface.main}
              textColor={colors.surface.content}
              onPress={() => handleLogin()}
            />
          </View>

          <View style={styles.register}>
            <View>
              <Text style={styles.registerText}>
                Don't have an account yet?
              </Text>
            </View>
            <FormButton
              text='Register'
              bgColor={colors.surface.main}
              textColor={colors.surface.content}
              onPress={() => navigation.navigate('Register')}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Developed by UjNimz © 2021</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary.main,
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: 'space-around',
    },
    header: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: 30,
    },
    form: {
      flex: 3,
      alignItems: 'stretch',
      justifyContent: 'center',
      marginBottom: 60,
    },
    register: {
      flex: 2,
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    registerText: {
      fontSize: 12,
      textAlign: 'center',
      color: colors.primary.content,
    },
    greeting: {
      padding: 15,
    },
    greetingText: {
      fontSize: 12,
      textAlign: 'center',
      color: colors.primary.content,
      marginBottom: 10,
    },
    footer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    footerText: {
      fontSize: 10,
      textAlign: 'center',
      color: colors.primary.content,
    },
  });

LoginScreen.propTypes = {
  authState: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  authStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authState: state.authState,
});

export default connect(mapStateToProps, {loginUser, authStatus})(LoginScreen);
