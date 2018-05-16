import { AsyncStorage } from 'react-native';
import { observable, action } from 'mobx';
import { Facebook } from 'expo';

class AuthStore {
  @observable username = '';
  @observable password = '';
  @observable token = '';

  @action
  onUsernameChange(username) {
    this.username = username;
  }

  @action
  onPasswordChange(password) {
    this.password = password;
  }

  @action
  async facebookLogin() {
    const tempToken = await AsyncStorage.getItem('fb_token');
    console.log(tempToken);
    if (tempToken) {
      console.log('set');
      this.token = tempToken;
    } else {
      this.doFacebookLogin();
    }
  }

  @action
  async doFacebookLogin() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('569669003403574', {
      permissions: ['public_profile']
    });

    if (type === 'cancel') {
      this.token = '';
      return;
    }
    this.token = token;
    await AsyncStorage.setItem('fb_token', token);
  }
}

export default AuthStore;
