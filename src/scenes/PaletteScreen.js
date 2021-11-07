import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import {ThemeSwitch} from '_components/atoms/ThemeSwitch';

const PaletteScreen = () => {
  const {colors} = useTheme();

  const containerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.main,
  };

  return (
    <>
      <View style={containerStyle}>
        <Text style={{color: colors.primary.main}}>My Money Root</Text>
        <Text style={{color: colors.primary.focus}}>My Money Root</Text>
        <View style={{backgroundColor: colors.primary.main, padding: 5}}>
          <Text style={{color: colors.primary.content}}>My Money Root</Text>
        </View>

        <Text style={{color: colors.secondary.main}}>My Money Root</Text>
        <Text style={{color: colors.secondary.focus}}>My Money Root</Text>
        <View style={{backgroundColor: colors.secondary.main, padding: 5}}>
          <Text style={{color: colors.secondary.content}}>My Money Root</Text>
        </View>
        <Text style={{color: colors.info}}>Info</Text>
        <Text style={{color: colors.success}}>success</Text>
        <Text style={{color: colors.warning}}>warning</Text>
        <Text style={{color: colors.error}}>error</Text>

        <ThemeSwitch />
      </View>
    </>
  );
};

export default PaletteScreen;
