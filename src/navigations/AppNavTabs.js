import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity} from 'react-native';
import {Ionicons, Octicons} from '@expo/vector-icons';
import {Host} from 'react-native-portalize';
import {useTheme} from '_theme/ThemeContext';
import HomeStack from './HomeStack';
import AddNewScreen from '_scenes/AddNewScreen';
import TransactionsScreen from '_scenes/TransactionsScreen';
import PlaceHolderScreen from '_scenes/PlaceHolderScreen';

const Tab = createBottomTabNavigator();

const AppNavTabs = () => {
  const {colors} = useTheme();

  return (
    <Host>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary.main,
          tabBarInactiveTintColor: colors.surface.content,
          tabBarStyle: {
            backgroundColor: colors.surface.focus,
            borderTopWidth: 0,
            paddingTop: 10,
          },
        }}
      >
        <Tab.Screen
          name='Home'
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Ionicons name='home' color={color} size={size} />
            ),
            tabBarLabelStyle: {
              color: colors.surface.content,
            },
          }}
        />
        <Tab.Screen
          name='PlaceHolderScreen'
          component={PlaceHolderScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0, // space from bottom bar
                  height: 60,
                  width: 60,
                  borderRadius: 60,
                  backgroundColor: colors.surface.focus,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 5,
                  borderColor: colors.primary.main,
                }}
              >
                <Octicons name='plus' color={colors.primary.main} size={40} />
              </View>
            ),
          }}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('AddNew');
            },
          })}
        />
        <Tab.Screen
          name='Transactions'
          component={TransactionsScreen}
          options={{
            tabBarLabel: 'Transactions',
            tabBarIcon: ({color, size}) => (
              <Ionicons name='list' color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </Host>
  );
};

export default AppNavTabs;
