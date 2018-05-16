import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { inject, observer } from 'mobx-react';

@inject('jobsStore')
@observer
class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={30} color={tintColor} />;
    }
  };

  state = {
    mapLoaded: false
  };

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.props.jobsStore.region}
          onRegionChangeComplete={this.props.jobsStore.updateRegion}
        />
        <View>
          <Button
            style={styles.buttonContainer}
            large
            title="Search This Area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={() =>
              this.props.jobsStore.fetchJobs(() => {
                this.props.navigation.navigate('deck');
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
};

export default MapScreen;
