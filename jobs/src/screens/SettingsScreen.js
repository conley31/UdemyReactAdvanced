import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { inject } from 'mobx-react';

@inject('jobsStore')
class SettingsScreen extends Component {
  render() {
    return (
      <View>
        <Button
          title="Reset Liked Jobs"
          icon={{ name: 'delete-forever' }}
          large
          bacgroundColor="#f44336"
          onPress={() => this.props.jobsStore.clearLikes()}
        />
      </View>
    );
  }
}

export default SettingsScreen;
