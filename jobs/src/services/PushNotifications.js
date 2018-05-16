import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  try {
    const previousToken = await AsyncStorage.getItem('pushtoken');
    console.log(previousToken);

    if (previousToken) {
      return;
    }
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    await axios.post(PUSH, { token: { token } });
    AsyncStorage.setItem('pushtoken', token);
  } catch (e) {
    console.log(e);
  }
};
