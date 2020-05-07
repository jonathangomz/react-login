import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginAPI from '../services/LoginAPI';

const { width: WIDTH } = Dimensions.get('window');

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username:undefined,
      password:undefined,
      showPass: true,
      press: false
    };
  }

  submit = () => {
    const username = this.state.username;
    const password = this.state.password;

    this.api = new LoginAPI();

    this.api.login(username, password)
      .then(async res => {
        if(res.ok)
          return res.json();
        throw await res.json();
      })
      .then(data => data.token ? this.api.storeToken(data.token) : data.message)
      .catch(err => {
        console.log(err);
        this.alert(err.message);
      });
  };

  showPass = () => {
    if(this.state.showPass)
      this.setState({ showPass: false, press: true });
    else
      this.setState({ showPass: true, press: false });
  };

  alert = (message) => {
    Alert.alert(
      'Error on login',
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        }
      ],
      {cancelable: false},
    );
  };

  render () {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.img}
            source={{
              uri: 'https://raw.githubusercontent.com/jonathangomz/react-login/master/assets/J_transparent.png'
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name={'ios-contact'}
            size={28}
            color={'rgba(98, 182, 203, 0.7)'}
            style={styles.inputIcon}
          />
          <TextInput
            ref={(el) => {this.username = el;}}
            onChangeText={(username) => this.setState({username})}
            style={styles.input}
            placeholder={'Username'}
            placeholderTextColor={'rgba(98, 182, 203, 0.7)'}
            underlineColorAndroid='transparent'
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name={'ios-lock'}
            size={28}
            color={'rgba(98, 182, 203, 0.7)'}
            style={styles.inputIcon}
          />
          <TextInput
            ref={(el) => {this.password = el;}}
            onChangeText={(password) => this.setState({password})}
            style={styles.input}
            placeholder={'Password'}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={'rgba(98, 182, 203, 0.7)'}
            underlineColorAndroid='transparent'
          />
          <TouchableOpacity style={styles.btnEye}
            onPress={this.showPass.bind(this)}>
            <Ionicons
              name={this.state.press ? 'ios-eye-off' : 'ios-eye'}
              size={26}
              color={'rgba(98, 182, 203, 0.7)'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnLogin}
          onPress={this.submit.bind(this)}>
          <Text style={styles.text}> Login </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#053C5E',
  },

  img: {
    width: '20rem',
    height: '10rem',
    marginBottom: 0
  },

  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color:'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25
  },

  inputContainer: {
    marginTop: 10
  },

  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37
  },

  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37
  },

  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#1F7A8C',
    justifyContent: 'center',
    marginTop: 20

  },

  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center'
  }
});
