import React from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';

export default function Splash() {
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
            <ActivityIndicator size='large' />
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