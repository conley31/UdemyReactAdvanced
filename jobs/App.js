import React from 'react';
import Expo, { Notifications } from 'expo';
import { StyleSheet, View, AsyncStorage, Alert } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'mobx-react';
import { create } from 'mobx-persist';

import AuthScreen from './src/screens/AuthScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import registerForNotificatons from './src/services/PushNotifications';

import AuthStore from './src/stores/AuthStore';
import JobsStore from './src/stores/jobsStore';

const hydrate = create({ storage: AsyncStorage });
const jobsStore = new JobsStore();
const authStore = new AuthStore();
//hydrate('likes', jobsStore);

export default class App extends React.Component {
  componentDidMount() {
    registerForNotificatons();
    Notifications.addListener(notification => {
      if (notification.origin === 'received' && notification.data.text) {
        Alert.alert('New Push Notification', notification.data.text, [{ text: 'Ok.' }]);
      }
    });
  }

  render() {
    const MainNavigator = createBottomTabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        main: {
          screen: createBottomTabNavigator(
            {
              map: { screen: MapScreen },
              deck: { screen: DeckScreen },
              review: {
                screen: createStackNavigator({
                  review: { screen: ReviewScreen },
                  settings: { screen: SettingsScreen }
                })
              }
            },
            {
              tabBarOptions: {
                labelStyle: { fontSize: 12 }
              }
            }
          )
        }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        }
      }
    );

    return (
      <Provider authStore={authStore} jobsStore={jobsStore}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});
