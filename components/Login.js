import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from './AuthContext';

const { width: WIDTH } = Dimensions.get('window');

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [seePass, setSeePass] = useState({show: false, press: false});

  const { signIn } = useContext(AuthContext);

  const showPass = () => {
    if(seePass.show)
      setSeePass({ show: false, press: true });
    else
      setSeePass({ show: true, press: false });
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
        <Ionicons
          name={'ios-contact'}
          size={28}
          color={'rgba(98, 182, 203, 0.7)'}
          style={styles.inputIcon}
        />
        <TextInput
          onChangeText={(username) => setUsername(username)}
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
          onChangeText={(password) => setPassword(password)}
          style={styles.input}
          placeholder={'Password'}
          secureTextEntry={seePass.show}
          placeholderTextColor={'rgba(98, 182, 203, 0.7)'}
          underlineColorAndroid='transparent'
        />
        <TouchableOpacity style={styles.btnEye}
          onPress={showPass.bind(this)}>
          <Ionicons
            name={seePass.press ? 'ios-eye-off' : 'ios-eye'}
            size={26}
            color={'rgba(98, 182, 203, 0.7)'}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnLogin}
        onPress={() => signIn(username, password)}>
        <Text style={styles.text}> Login </Text>
      </TouchableOpacity>
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

  img: {
    width: 300,
    height: 200,
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