import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import Logo from '_components/atoms/Logo';

const TermsScreen = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <Logo color={colors.primary.main} />
      <Text style={styles.title}>Please note:</Text>
      <Text style={styles.text}>
        This end-user licence agreement is a legal agreement between you and
        MyMoney mobile app. It sets out the basis on which we license you to use
        the MyMoney mobile application (including any updates or supplements to
        it) and the data and information available through it.
      </Text>
      <Text style={styles.text}>
        We remain owners of the App at all times. You get only the limited right
        to use the App and access information and data through it on the basis
        specified in this document.
      </Text>
      <Text style={styles.text}>
        By downloading and using the App you agree to these terms, which bind
        you. If you do not accept these terms, you may not use the App and must
        remove it from your device now.
      </Text>
      <Text style={styles.text}>
        Developer Contact: ujithnimantha@gmail.com
      </Text>
      <Text style={styles.text}>UjNimz © 2021</Text>
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: colors.background.main,
      padding: 15,
    },
    title: {
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 15,
      marginTop: 15,
      color: colors.text.main,
    },
    text: {
      fontSize: 14,
      marginBottom: 15,
      color: colors.text.main,
    },
  });

export default TermsScreen;
