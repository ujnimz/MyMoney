import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {headerHeight} from '_utils/useDimensions';
import {useTheme} from '_theme/ThemeContext';
import Logo from '_components/atoms/Logo';

const Header = ({navigation}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <Logo color={colors.primary.content} />

      <View>
        <Pressable
          onPress={() => navigation.navigate('Settings')}
          style={{
            padding: 5,
          }}
        >
          <Ionicons
            name='person-circle'
            color={colors.primary.content}
            size={30}
          />
        </Pressable>
      </View>
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      height: headerHeight,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingLeft: 30,
      paddingRight: 30,
    },
  });

export default Header;
