import * as SecureStore from 'expo-secure-store';

const URL = 'https://jonathangomz-sso.glitch.me/';

export default class LoginAPI {

    async login(username, password) {
        if(!username){
            return {message:'Missing username', token:null};
        }
        else if(!password){
            return {message:'Missing password', token:null};
        }
        else {
            const response = await fetch(URL + 'login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'username='+username+'&password='+password
            });

            return await response.json();
        }
    }

    storeToken(token) {
        return SecureStore.setItemAsync('token', token);
    }

    getToken() {
        return SecureStore.getItemAsync('token');
    }
}