import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const CREATE_USER = 'https://us-central1-one-time-password-eadcf.cloudfunctions.net/createUser';
const GEN_CODE = 'https://us-central1-one-time-password-eadcf.cloudfunctions.net/generateCode';
const VERIFY = 'https://us-central1-one-time-password-eadcf.cloudfunctions.net/verifyPass';

class SignInForm extends Component {
  state = { phone: '', code: '' };

  handleSubmit = async () => {
    try {
      let { data } = await axios.post(VERIFY, { phone: this.state.phone, code: this.state.code });

      firebase.auth().signInWithCustomToken(data.token);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>
            Enter Phone Number
          </FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <FormLabel>
            Enter Phone Code
          </FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
          />
        </View>

        <Button
          title="Submit"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default SignInForm;
