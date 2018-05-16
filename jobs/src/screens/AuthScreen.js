import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { observer, inject } from 'mobx-react';

@inject('authStore')
@observer
class AuthScreen extends Component {
  componentDidMount() {
    this.props.authStore.facebookLogin();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.onAuthComplete(this.props.authStore);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return <View token={this.props.authStore.token} />;
  }
}

export default AuthScreen;
