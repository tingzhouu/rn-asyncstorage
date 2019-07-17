import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onPressLogin = async () => {
    const { username, password } = this.state;
    try {
      await AsyncStorage.setItem('@username', username);
      await AsyncStorage.setItem('@password', password);
      this.props.onSuccessfulLogin();
    } catch (e) {
      // saving error
      Alert.alert('error', e);
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>This is the login page</Text>
        <Text>Username</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          autoCorrect={false}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          autoCorrect={false}
        />

        <Button
          onPress={this.onPressLogin}
          title="Log in!"
          color="#841584"
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 20,
  },
  textInput: {
    height: 40, borderColor: 'gray', borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  }
});


export default LoginPage;
