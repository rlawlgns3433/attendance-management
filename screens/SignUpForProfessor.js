import React, { useState } from 'react';
import { View, Text, 
  TextInput, Alert, ScrollView, Keyboard ,StyleSheet, SafeAreaView
, StatusBar
} 

  from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Professor_registration } from '../API/firebaseMethods';
import { LinearGradient } from 'expo-linear-gradient';
import RadioButton from 'expo-radio-button'

//menu1 import add
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';


export default function SignUpForProfessor({ navigation }) {
  const [Name, setLastName] = useState('');
  const [professorNumber, setProfessorNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');


  const emptyState = () => {
    setLastName('');
    setProfessorNumber('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setGender('');
    setPhone('');
    setDepartmet('');
  };

  const handlePress = () => {
    if (!Name) {
      Alert.alert('이름을 입력해주세요');
    }else if(!professorNumber){
      Alert.alert('교번을 입력해주세요');
    }else if (!email) {
      Alert.alert('이메일을 입력해주세요');
    } else if (!password) {
      Alert.alert('비밀번호를 입력해주세요');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('비밀번호를 재입력해주세요');
    } else if (password !== confirmPassword) {
      Alert.alert('비밀번호가 일치하지 않습니다');
    }  else if (!phone) {
      Alert.alert('연락처를 입력해주세요');
    } else if (!department) {
      Alert.alert('부서를 선택해주세요.');
    } else {
      Professor_registration(
        email,
        password,
        Name,
        professorNumber,
        gender,
        phone,
        department,
      );
      navigation.navigate('Loading');
      emptyState();
    }
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
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
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
                    onChangeText={(val) => handlePasswordChange(val)}
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
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                </View>


                <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    사용자 동의
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}내용</Text>
                <Text style={styles.color_textPrivate}>{" "}인듯</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}함</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {}}
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
    /*
    <SafeAreaView>
           <LinearGradient
             colors={["#fff","#008080"]}
             style={{height:"100%"}}
        >
     <View style={styles.container}>

       <Text style={styles.text}>회원가입</Text>

       <ScrollView onBlur={Keyboard.dismiss}>

         <TextInput
          style={styles.textInput}
          placeholder="이름"
          value={Name}
          onChangeText={(name) => setLastName(name)}
         />
         <TextInput
          style={styles.textInput}
          placeholder="교번"
          value={professorNumber}
          keyboardType={'number-pad'}
          onChangeText={(snumber) => setProfessorNumber(snumber)}
         />
         <TextInput
          style={styles.textInput}
          placeholder="이메일(교번@du.ac.kr)"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
         />

          <TextInput
          style={styles.textInput}
          placeholder="비밀번호"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
         />
         <TextInput
          style={styles.textInput}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChangeText={(password2) => setConfirmPassword(password2)}
          secureTextEntry={true}
          />
      <View
        style = {{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'}}
      ><Text>성별    </Text>
        <RadioButton value="남자"
        containerStyle={{ marginRight: 10 }}
        selected={gender} onSelected={(value) => setGender(value)} 
        radioBackground="green" >
        <Text>남자</Text>
        </RadioButton>
      <RadioButton value="여자" selected={gender} onSelected={(value) => setGender(value)} radioBackground="green" >
        <Text>여자</Text>
      </RadioButton>
      </View>

      <TextInput
          style={styles.textInput}
          placeholder="연락처 '-' 빼고 입력"
          value={phone}
          keyboardType={'number-pad'}
          onChangeText={(phone) => setPhone(phone)}
         />
         <TextInput
          style={styles.textInput}
          placeholder="학과"
          value={department}
          keyboardType={'default'}
          onChangeText={(department) => setDepartment(department)}
         />

          <TouchableOpacity style={styles.button} onPress={handlePress}>
           <Text style={styles.buttonText}>계정 생성하기</Text>
          </TouchableOpacity>

          <Text style={styles.inlineText}>계정이 있으신가요?</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
       </ScrollView>

     </View>
     </LinearGradient>
    </SafeAreaView>*/
  );
}

const styles = StyleSheet.create({
  /*
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    padding: 5,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: '5%',
  },
  buttonText: {
    fontSize:20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'navy',
    textAlign: 'center',
    marginTop: '5%',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    margin: '5%',
    marginTop:'15%',
    fontWeight: 'bold',
    color: '#2E6194',
  },
  textInput: {
    width: 300,
    fontSize:18,
    borderWidth: 1,
    borderColor:'#a4eddf',
    padding: 10,
    margin: 5,
  },*/
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
