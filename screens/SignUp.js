import React, { useState } from 'react';
import { StatusBar,View, Text, TextInput, ScrollView,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { registration } from '../API/firebaseMethods';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

export default function SignUp({ navigation }) {
  const [Name, setLastName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



  const emptyState = () => {
    setLastName('');
    setStudentNumber('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

  };

  const handlePress = () => {

    registration(
      email,
      password,
      Name,
      studentNumber,
    );
    navigation.navigate('Loading');
    emptyState();
  };

  return (

<View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>회원가입</Text>
        </View>

        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >

          <ScrollView>
          <Text style={styles.text_footer}>이메일</Text>
          <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="학번@du.ac.kr"
                    style={styles.textInput}
                    value={email}
                    autoCapitalize="none"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>이름</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="이름"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={Name}
                    onChangeText={(Name) => setLastName(Name)}
                />
                </View>

          <Text style={styles.text_footer}>학번</Text>
          <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="학번"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={studentNumber}
                    onChangeText={(snumber) => setStudentNumber(snumber)}
                />
            </View>


            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>비밀번호</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    
                    size={20}
                />
                <TextInput 
                    placeholder="비밀번호 입력"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
                </View>
                <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>비밀번호 확인</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="비밀번호 확인"
                    style={styles.textInput}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    value={confirmPassword}
                    onChangeText={(password2) => setConfirmPassword(password2)}
                />
                </View>


                <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    가입 시
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}서비스 약관</Text>
                <Text style={styles.color_textPrivate}>{" "}및</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}개인 정보 정책</Text>
                <Text style={styles.color_textPrivate}>에 동의</Text>     
            </View>
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress= {handlePress}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>회원가입</Text>
                </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>로그인</Text>
                </TouchableOpacity>
                </View>

       </ScrollView>
       </Animatable.View>
     </View>
  );
}

const styles = StyleSheet.create({
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
      flex: Platform.OS === 'ios' ? 3 : 5,
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
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
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
  },
  textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20
  },
  color_textPrivate: {
      color: 'grey'
  }
});
