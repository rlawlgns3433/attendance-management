import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './SignUp';
import SignUpForProfessor from './SignUpForProfessor';
import { TouchableOpacity, View, Text, StatusBar,} from "react-native";

export default function SignUpSelect({navigation}){
    return(
        <View style ={{flexDirection : 'column', justifyContent:'center', alignItems:'center'}}>
            
            <TouchableOpacity 
            style = {{padding : 30, margin : 15, marginTop : 140, borderColor : '#00AAFF', borderRadius : 10, borderWidth : 2}}
            onPress={()=>navigation.navigate('Sign Up')}>
                <Text>학생 회원가입</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style = {{padding : 30, margin : 15, marginTop:55, borderColor : '#00AAFF', borderRadius : 10, borderWidth : 2}}
            onPress={()=>navigation.navigate('Sign Up For Professor')}>
                <Text>교수 회원가입</Text>
            </TouchableOpacity>
        </View>

    );
}