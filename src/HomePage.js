import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class HomePage extends Component {
  state = { username: '', password: '' };

  onPressLogout = async () => {
    try {
      const { onSuccessfulLogout } = this.props;
      await AsyncStorage.removeItem('@username');
      await AsyncStorage.removeItem('@password');
      onSuccessfulLogout();
    } catch (e) {
      // remove error
    }
  }

  async componentDidMount() {
    try {
      const username = await AsyncStorage.getItem('@username');
      const password = await AsyncStorage.getItem('@password');
      if (username !== null && password !== null) {
        // value previously stored
        this.setState({ username, password });
      }
    } catch (e) {
      // error reading value
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>This is the home page</Text>
        <Text>{`Your username is ${username}`}</Text>
        <Text>{`Your password is ${password}`}</Text>
        <Button
          onPress={this.onPressLogout}
          title="Log out!"
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


export default HomePage;
