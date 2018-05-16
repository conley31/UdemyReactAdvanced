import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const CREATE_USER = 'https://us-central1-one-time-password-eadcf.cloudfunctions.net/createUser';
const GEN_CODE = 'https://us-central1-one-time-password-eadcf.cloudfunctions.net/generateCode';
const VERIFY = 'https://us-central1-one-time-password-eadcf.cloudfunctions.net/verifyPass';

class SignUpForm extends Component {
  state = { phone: '' };

  handleSubmit = async () => {
    try {
      console.log(this.state.phone);
      await axios.post(CREATE_USER, { phone: this.state.phone });
      await axios.post(GEN_CODE, { phone: this.state.phone });
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
        <Button
          title="Submit"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default SignUpForm;
