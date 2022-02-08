import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';
import apiKeys from './config/keys';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import LoadingScreen from './screens/LoadingScreen';
import Dashboard from './screens/Dashboard';
import CreateEmployee from './screens/WelcomeScreen';
import { Platform, InteractionManager} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import FoodScreen from './screens/FoodScreen';
import NoticeScreen from './screens/NoticeScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function App() {
  try{


  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
  const _setTimeout = global.setTimeout;
  const _clearTimeout = global.clearTimeout;
  const MAX_TIMER_DURATION_MS = 60 * 1000;
  if (Platform.OS === "android") {
  const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
      const waitingTime = ttl - Date.now();
      if (waitingTime <= 1) {
        InteractionManager.runAfterInteractions(() => {
          if (!timerFix[id]) {
            return;
          }
          delete timerFix[id];
          fn(...args);
        });
        return;
      }

      const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
      timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
      if (MAX_TIMER_DURATION_MS < time) {
        const ttl = Date.now() + time;
        const id = "_lt_" + Object.keys(timerFix).length;
        runTask(id, fn, ttl, args);
        return id;
      }
      return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = (id) => {
      if (typeof id === "string" && id.startsWith("_lt_")) {
        _clearTimeout(timerFix[id]);
        delete timerFix[id];
        return;
      }
      _clearTimeout(id);
    };
  }

}catch(error){
  console.log(error);
  
}
  return (

    <NavigationContainer>


      <Stack.Navigator>
      <Stack.Screen name={'Loading'} component={LoadingScreen} options={{ headerShown: false }}/>
      <Stack.Screen name={'Dashboard'} component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={'NoticeScreen'} component={NoticeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={'FoodScreen'} component={FoodScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={CreateEmployee} options={{ headerShown: false }}/>
      <Stack.Screen name='Sign Up' component={SignUp} options={{ headerShown: false }}/>
      <Stack.Screen name='Sign In' component={SignIn} options={{ headerShown: false }}/>
      
      </Stack.Navigator>

    </NavigationContainer>
    
  );
}

export default App;