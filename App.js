/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-community/async-storage';
import LoginPage from "./src/LoginPage";
import HomePage from "./src/HomePage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  async componentDidMount() {
    try {
      const username = await AsyncStorage.getItem('@username');
      const password = await AsyncStorage.getItem('@password');
      if (username !== null && password !== null) {
        // value previously stored
        this.setState({ isLoggedIn: true });
      }
    } catch (e) {
      // error reading value
    }
  }

  onSuccessfulLogin = () => {
    this.setState({ isLoggedIn: true });
  }

  onSuccessfulLogout = () => {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <View>
        {!isLoggedIn && (
          <LoginPage
            onSuccessfulLogin={this.onSuccessfulLogin}
          />
        )}
        {isLoggedIn && (
          <HomePage
            onSuccessfulLogout={this.onSuccessfulLogout}
          />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: { paddingTop: 20 },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
