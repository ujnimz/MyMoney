import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import Logo from '_components/atoms/Logo';

const LoginScreen = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <View style={styles.header}>
          <Logo color={colors.black.content} />
          <ActivityIndicator size='small' color={colors.primary.content} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Developed by UjNimz © 2021</Text>
        </View>
      </View>
    </View>
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
    login: {
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

export default LoginScreen;
