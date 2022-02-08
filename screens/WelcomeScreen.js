import React, { useState } from 'react';
import { StyleSheet ,Text, View, Platform,  StatusBar} from 'react-native';
import { TextInput} from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {signIn} from '../API/firebaseMethods';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const WelcomeScreen=({navigation})=>{
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
 
   const handlePress = () => {
     signIn(email, password);
     setEmail('');
     setPassword('');
   };
    return(
<View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>반갑습니다!</Text>
        </View>

         
         <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, ]}
          >
            <ScrollView>
            <Text style={[styles.text_footer,]}>이메일</Text>
          <View style={styles.action}>
              <FontAwesome 
                  name="user-o"
                  size={20}
              />
              <TextInput 
                  placeholder="이메일 입력"
                  placeholderTextColor="#666666"
                  value = {email}
                  style={[styles.textInput,{backgroundColor:'white'}]}
                  autoCapitalize="none"
                  onChangeText={(email) => setEmail(email)}
              />
                
          </View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>비밀번호</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    size={20}
                />
                <TextInput 
                    placeholder="비밀번호 입력"
                    placeholderTextColor="#666666"
                    value = {password}
                    style={[styles.textInput,{backgroundColor:'white'}]}
                    autoCapitalize="none"
                    onChangeText={(password) => setPassword(password)}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.button}>
            <TouchableOpacity
                    style={styles.signIn}
                    onPress={handlePress}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>로그인</Text>
                </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => navigation.navigate('Sign Up')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>회원가입</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>

)}
const theme={
    colors:{
        primary:"#257d6d"
    }
}
const styles=StyleSheet.create({
container: {
  flex: 1, 
  backgroundColor: '#009387'
},
header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
},
footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
},
text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
},
text_footer: {
    color: '#05375a',
    fontSize: 18
},
action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
},
textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
},
errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
button: {
    alignItems: 'center',
    marginTop: 50
},
signIn: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
}

})

export default WelcomeScreen