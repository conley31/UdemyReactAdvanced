import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './src/SignUpForm';
import SignInForm from './src/SignInForm';

export default class App extends React.Component {
  componentDidMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD1lMlVDmbaUZuWgFaDYmiiL7tKrw899N4',
      authDomain: 'one-time-password-eadcf.firebaseapp.com',
      databaseURL: 'https://one-time-password-eadcf.firebaseio.com',
      projectId: 'one-time-password-eadcf',
      storageBucket: 'one-time-password-eadcf.appspot.com',
      messagingSenderId: '269226441344'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
