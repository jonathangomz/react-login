import * as SecureStore from 'expo-secure-store';

const URL = 'https://jonathangomz-sso.glitch.me/';

export default class LoginAPI {

    login(username, password) {
        if(!username){
            return Promise.reject({message:'Missing username', token:null});
        }
        else if(!password){
            return Promise.reject({message:'Missing password', token:null});
        }
        else {
            return fetch(URL + 'login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'username='+username+'&password='+password
            });
        }
    }

    storeToken(token) {
        return SecureStore.setItemAsync('token', token);
    }

    getToken() {
        return SecureStore.getItemAsync('token');
    }
}