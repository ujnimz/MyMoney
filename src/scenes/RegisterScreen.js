import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import TextButton from '_components/atoms/TextButton';
import Logo from '_components/atoms/Logo';
import FormTextInput from '_components/atoms/FormTextInput';
// REDUX
import {connect} from 'react-redux';
import {registerUser} from '_redux/actions/auth';

const RegisterScreen = ({navigation, registerUser, authState}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const {isLoading, userEmail} = authState;
  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isRegistered && userEmail) {
      navigation.navigate('Login');
    }
    return () => {
      setIsRegistered(false);
    };
  }, [userEmail]);

  const handleRegister = () => {
    registerUser({name, email, password});
    setIsRegistered(true);
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
            <FormTextInput
              value={name}
              onChangeText={val => setName(val)}
              name='name'
              placeholder='Name'
              textContentType='name'
              autoFocus={true}
            />
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
            <TextButton
              text='Register'
              bgColor={colors.surface.main}
              textColor={colors.surface.content}
              onPress={() => handleRegister()}
            />
          </View>

          <View style={styles.register}>
            <View>
              <Text style={styles.registerText}>Already have an account?</Text>
            </View>
            <TextButton
              text='Login here'
              bgColor={colors.surface.main}
              textColor={colors.surface.content}
              onPress={() => navigation.navigate('Login')}
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

RegisterScreen.propTypes = {
  authState: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authState: state.authState,
});

export default connect(mapStateToProps, {registerUser})(RegisterScreen);
