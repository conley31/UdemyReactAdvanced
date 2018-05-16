import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import _ from 'lodash';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobAPP', color: '#03a9f4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03a9f4' }
];

class WelcomeScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    const token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  onComplete = () => {
    this.props.navigation.navigate('auth');
  };

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return <Slides data={SLIDE_DATA} onComplete={this.onComplete} />;
  }
}

export default WelcomeScreen;
