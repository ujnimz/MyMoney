import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '_theme/ThemeContext';
import SplashScreen from '_scenes/SplashScreen';
import {LogBox} from 'react-native';

// REDUX
import {Provider} from 'react-redux';
import mainStore from '_redux/mainStore';

const AppRoot = () => {
  LogBox.ignoreLogs([
    'Warning: Async Storage has been extracted from react-native core',
  ]);

  return (
    <Provider store={mainStore}>
      <ThemeProvider>
        <NavigationContainer>
          <SplashScreen />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default AppRoot;
