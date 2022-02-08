import {ImageBackground, StyleSheet, View, Text,SafeAreaView} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function WelcomeScreen1 ({navigation}) {
  return (
    
     <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>동서울대 출석앱에 오신걸 환영합니다!</Text>
      </View>
      <SafeAreaView>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign Up')} >
        <Text style={styles.buttonText}>회원가입</Text>
       </TouchableOpacity>
      <Text style={styles.inlineText}>이미 가입하셨나요?</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      </SafeAreaView>
     </ImageBackground>
     
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#4ecdc4',
    padding: 5,
    margin: '2%',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'navy',
    textAlign: 'center'
  },
  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'navy',
    textAlign: 'center',
    marginTop: '5%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  titleContainer: {
    position: 'absolute',
    top: 170,
  },
});
