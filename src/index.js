import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {AppearanceProvider} from 'react-native-appearance';
import {ThemeProvider} from '_theme/ThemeContext';
import SplashScreen from '_scenes/SplashScreen';

// REDUX
import {Provider} from 'react-redux';
import mainStore from '_redux/mainStore';

const AppRoot = () => {
  return (
    <Provider store={mainStore}>
      <AppearanceProvider>
        <ThemeProvider>
          <NavigationContainer>
            <SplashScreen />
          </NavigationContainer>
        </ThemeProvider>
      </AppearanceProvider>
    </Provider>
  );
};

export default AppRoot;
