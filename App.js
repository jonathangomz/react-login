import 'react-native-gesture-handler';
import React, { useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { Alert } from 'react-native';
import Splash from './components/Splash';
import Login from "./components/Login";
import AfterLogin from "./components/AfterLogin";
import LoginAPI from "./services/LoginAPI";
import { AuthContext } from "./components/AuthContext";

const Stack = createStackNavigator();

export default function App() {
  
  const [state, dispatch] = useReducer(
    (prevSate, action) => {
      switch(action.type) {
        case 'SIGN_UP':
          return {
            ...prevSate,
            token: null,
            isLoading: false
          };
        case 'TO_HOME':
          return {
            ...prevSate,
            token: action.token,
            isLoading: false
          };
        case 'SIGN_OUT':
          return {
            ...prevSate,
            token: null,
            isLoading: false
          };
      }
    },
    {
      isLoading: true,
      token: null
    }
  );
        
  const api = new LoginAPI();
        
  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      
      token = await api.getToken();

      /**
       * 
       * TODO: Validate token sending to SSO
       * 
       */ 

      if(token)
        dispatch({type: 'TO_HOME', token});
      else
        dispatch({tye: 'SIGN_UP'});
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: (username, password) => {
        api.login(username, password)
        .then(res => {
          if(res.token){
            api.storeToken(res.token)
            .then(() => dispatch({type: 'TO_HOME', token: res.token}));
          }else {
            alert(res.message);
          }
        });
      },
  
      signOut: () => dispatch({type: 'SIGN_OUT'})
    }), []
  );

  const alert = (message) => {
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

  return(
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>{chooseScreen(state)}</Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
}

export const stateConditionString = state => {
  if (state.isLoading)
      return 'LOAD_APP';

  if (state.token)
      return 'LOAD_HOME';

  if (!state.token)
    return 'LOAD_SIGNIN';
};

const chooseScreen = state => {
  let navigateTo = stateConditionString(state);

  switch (navigateTo) {
      case 'LOAD_APP':
          return <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>;

      case 'LOAD_SIGNIN':
          return <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />;

      case 'LOAD_HOME':
          return <Stack.Screen
                      name="AfterLogin"
                      component={AfterLogin}
                      options={{
                          headerStyle: { backgroundColor: 'black' },
                          headerTintColor: 'white'
                      }}
                  />;
      default:
          return <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>;
  }
};