import React, { Component, useState, useContext } from 'react';
import { StyleSheet, Text, View, Alert, Image, Button } from 'react-native';
import LoginAPI from '../services/LoginAPI';
import { AuthContext } from './AuthContext';

const api = new LoginAPI();

export default function Login() {

  const [token, setToken] = useState('');
  const { signOut } = useContext(AuthContext);

  api.getToken().then(token => setToken(token));

  const alert = () => {
    Alert.alert(
      'Token',
      token,
      [
        {
          text: 'Ok',
          style: 'cancel',
        }
      ],
      {cancelable: false},
    );
  };

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
          <Text style={styles.text}>If you press the button, you will see your token</Text>
          <Button
              title="Reveal"
              onPress={() => alert()}
          />
          <Button
              title="Sign out"
              onPress={() => signOut()}
          />
      </View>
    </View>
  );
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

  text: {
    color: '#FFF',
  },

  img: {
    width: 300,
    height: 200,
    marginBottom: 0
  }
});
