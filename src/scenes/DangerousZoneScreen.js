import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import FormButton from '_components/atoms/FormButton';

const DangerousZoneScreen = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const handleLogout = () => {
    return;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>We will miss you!</Text>

      <Text style={styles.text}>
        When you delete your account, you will also loose all your transaction
        data.
      </Text>
      <Text style={styles.text}>
        We do not keep any data of yours after deletion.
      </Text>

      <FormButton
        text='Delete My Account'
        bgColor={colors.primary.main}
        textColor={colors.primary.content}
        //isAnimating={isLoading}
        onPress={() => handleLogout()}
      />
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
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

export default DangerousZoneScreen;
