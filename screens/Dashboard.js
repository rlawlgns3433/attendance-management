import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, StatusBar,Image,Animated, SafeAreaView, ScrollView, Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import {loggingOut} from '../API/firebaseMethods';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import FoodScreen from './FoodScreen';
import NoticeScreen from './NoticeScreen';

const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const settingIcon = { uri:"https://postfiles.pstatic.net/MjAyMTA4MTFfMTA5/MDAxNjI4NjU0MTUyOTM3._7Hb6JWH9zK3vWU0atgQ7s3dm_JuyR7tETUkk2pPiBcg.7I6FO5r2xhDvtIH8ccIwvNsxgNskTHFFkWQnMgQ4OTcg.PNG.qwe999333/settings.png?type=w773"};
const profileIcon1 = { uri:"https://postfiles.pstatic.net/MjAyMTA4MTFfMjA3/MDAxNjI4NjU0MTUyOTUz.fTav1yTOAP7E6BP7FIKH0rMs9-7fT0RjnBBFf-6-izEg.kqWtDDCRODxXCv9YRv1KtePul0fAF0Io2K3OUAgTBAQg.PNG.qwe999333/user.png?type=w773"};
const profileIcon = { uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRcGyQC68xrDQDJwre7wX9jOHDUuoRNRDTMg&usqp=CAU"};
//tab image

const searchIcon = { uri:"https://postfiles.pstatic.net/MjAyMTA4MTFfMTg0/MDAxNjI4NjU0MTUyOTQ0.8OyeMZdcrVlLYsHzP5LReSArvqQpUuJzp4W0kgrV9RYg.Glxibj_XRSlLzf2EWOOiygcYO9F4x0XA0t6FKc6vtHEg.PNG.qwe999333/search.png?type=w773"};
const homeIcon = { uri:"https://postfiles.pstatic.net/MjAyMTA4MTFfMTI3/MDAxNjI4NjU0MTUyOTQz.0rNjKF5eFO2CUpwGpkGUypqNcW2BFoo15R1a-_ne-Z4g.8_o2OXS5CyPqm1cP_mK66KUiejxqIyQfmcrerCKIHN4g.PNG.qwe999333/home.png?type=w773"};
const bellIcon = { uri:"https://postfiles.pstatic.net/MjAyMTA4MTFfMjQ2/MDAxNjI4NjU0MTUyOTQ3.UlpBgHuzoZFzHwuLbvypEHiFehZeudUhcmrtNnVEvNsg.9ZxUmXgapm7-FIC9aN9Uf_BMucQHXuH-t3cLBReT2J0g.PNG.qwe999333/bell.png?type=w773"};
const logoutIcon ={uri :"https://postfiles.pstatic.net/MjAyMTA4MTFfMTk3/MDAxNjI4NjU3NTA4MjM3.7Q0YFvRF9SYvzV0EFhHwT2HD4sdaoOmIdWKKrjJDkuYg.GGe5a1rsS67zgneIWOQ3n2Dd4iVEolcwt769CL2kHSMg.PNG.qwe999333/logout.png?type=w773"};

//menu image

const menuIcon = { uri:"https://postfiles.pstatic.net/MjAyMTA4MTFfMjU3/MDAxNjI4NjU0MTUyOTQx.9v_BRGd-beIjN1Kppc4G-6JvsQh89zVYmu7QL0vEPRQg.h4snXgn2z5s40k67EZSwepKwbvpn9bOg7pWQtHBz2fMg.PNG.qwe999333/menu.png?type=w773"};
const closeIcon = { uri:"https://postfiles.pstatic.net/MjAyMTA4MTFfMTcz/MDAxNjI4NjU0MTUzMDgz.LTT0tuf6sUvIsURUIhbtrS2wIVOJ6bVqR-d25xaJD3Qg.HHa9iIMGHoDjkhy4OMVAJHupp2lEaQUoga2WzYYyMR4g.PNG.qwe999333/close.png?type=w773"};
const portal ={uri:"https://postfiles.pstatic.net/MjAyMTA4MjVfODUg/MDAxNjI5ODc3MjcwMjkx.uXtk-tkz8vszUnhyJcfrQV0KBvrCTv_mnwxusq4hk8og._jONzBkcKtTUtOUKNKupVgNsZ1IW7WS8GgGLtSj2IT8g.PNG.qwe999333/portal.png?type=w773"};
const status={uri:"https://postfiles.pstatic.net/MjAyMTA4MjVfOTcg/MDAxNjI5ODc3MjcwMjcx.gTIutzQWdNULI4cIrVg3M3lOPnSBoCrNgjK2qQA_aBog.z47yc4iD52njTBkMXmYg-5DprIQ4La-Qs7rSIR9kmwQg.PNG.qwe999333/status.png?type=w773"};
const tel={uri:"https://postfiles.pstatic.net/MjAyMTA4MjVfMjYg/MDAxNjI5ODc3MjcwMzY3.pmsdInbGLekVt4w-g7YWWij9lcdUtQXYHjsCqttzTOQg.CGj0WqoPaYJC_OAVN3PqVkLrLbu7mW2Vo_sqN4Ao8kog.PNG.qwe999333/telephone.png?type=w773"};
const attendance={uri:"https://postfiles.pstatic.net/MjAyMTA4MjVfMjM5/MDAxNjI5ODc3MjcwMjkz.lsOA2U7tu5vZ1TXb7wcBl6tu5a7AfI4S0ypwewJ_aLwg.iWOHAy8AHBFzFfyCArE7suuceUiFWy0CUhZCc3RDkFQg.PNG.qwe999333/attendance.png?type=w773"};
const food={uri:"https://postfiles.pstatic.net/MjAyMTA4MjVfNTIg/MDAxNjI5ODc3MjcwMzQ1.tib7uBqBBCj6j_aLW5huVdHDwRMqQqYXKecS4YI4CrAg.MjA6icMPyheLGCvaVDiFW3-nRgATGYo-BzLyBDKIG20g.PNG.qwe999333/food.png?type=w773"};


const anyPhoto={uri:"https://postfiles.pstatic.net/MjAyMTA4MTFfMTgw/MDAxNjI4NjYxNjkxNDk5.ERAqYrpGrW-uqpurF9N9skPkjOnvXS8cP8obdC9f8Q8g.L5fFz24JbZeNdMkOiycuTyaaghZDVZOw10Ak3Y_DCG8g.JPEG.qwe999333/KakaoTalk_20210727_180150422.jpg?type=w773"}
// 임폴트 및 아이콘 이미지 선언


export default function Dashboard({ navigation }) {

  const [Name, setName] = useState('');
  let currentUserUID = firebase.auth().currentUser.uid;
  
  

  const[currentTab,setCurrentTab] = useState("Home");
  const[showMenu,setShowMenu]=useState(false);
  //animation setting

  const offsetValue=useRef(new Animated.Value(0)).current;
  const scaleValue=useRef(new Animated.Value(1)).current;
  const closeButtonOffset=useRef(new Animated.Value(0)).current;
//스케일조정





async function getUserInfo(){
      try {
        let doc = await firebase
          .firestore()
          .collection('Students')
          .doc(currentUserUID)
          .get();

        if (!doc.exists){
          Alert.alert('No Students data found!')
        } else {
          let dataObj = doc.data();
          setName(dataObj.Name)

        }
      } catch (err){
      Alert.alert('There is an error.', err.message)
      }
    }
    getUserInfo();

  
const TabButton= (currentTab,setCurrentTab,title,image) => {
  return( 
    <TouchableOpacity onPress={()=>{
      if(title =="로그아웃"){
        loggingOut();
  
      }else if(title == "출석체크"){
        navigation.navigate('HomeScreen');
      }else if(title == "공지사항"){
        navigation.navigate('NoticeScreen')
      }else if(title == "식단표"){
        navigation.navigate('FoodScreen')
      }else if(title == "컴소 과사무실"){
        Linking.openURL('tel:031-720-2090');
      }
      else{
        setCurrentTab(title)
      }
      
      //setCurrentTab(title)
      //버튼 클릭 시 색깔 변화 62 View style background =title ? 'white':'transparent'
    }}>
      <View style={{
          flexDirection:"row",
          alignItems:'center',
          paddingVertical:8,
          backgroundColor: currentTab == title ? 'white':'transparent',
          paddingLeft:13,
          paddingRight:35,
          borderRadius:9,
          marginTop:15,
        }}>
        <Image source={image} style={{
          width:25,height:25,
          tintColor:currentTab==title ?"#009387":"white"
        }}></Image>
        <Text style={{
          fontSize:15,
          fontWeight:'bold',
          paddingLeft:15,
          color:currentTab==title ?"#009387":"white"
        }}>{title}</Text>
  
        </View>
      </TouchableOpacity>
      )}
    return (

<SafeAreaView style={styles.drawercontainer}>
  
    <View style={{justifyContent: 'flex-start',padding:30}}>

      <Image style={{
        height:60,
        width:60,
        borderRadius: 10
       }}
      source={profileIcon
      // 당사자 사진이나 기본 프로필 이미지
       }></Image>
      <Text style={{fontSize:20,
      fontWeight:'bold',
      color:'white',
      marginTop:20}
      //db 000님 환영합니다.
        }>
        {Name}님 환영합니다.</Text>
        <TouchableOpacity>
        <Text style={{
          marginTop:6,
          color:'white'
          }//추가 설명 가능
          }></Text>
        
        </TouchableOpacity>
      <View style={{
        flexGrow:1,
        marginTop:30}
    //flexGrow: Flex Item의 증가 너비 비율을 설정
      }>
        {
          //탭 버튼
        }
        {TabButton(currentTab,setCurrentTab,"출석체크",attendance)}
        {TabButton(currentTab,setCurrentTab,"공지사항",status)}
        {TabButton(currentTab,setCurrentTab,"식단표",food)}
        {TabButton(currentTab,setCurrentTab,"컴소 과사무실",tel)}
        

        

      </View>
      <View>
         {TabButton(currentTab,setCurrentTab,"로그아웃",logoutIcon)}
      </View>
    </View>
    <Animated.View style={{
      flxGrow:1,
      backgroundColor:'white',
      position:'absolute',
      top:0,
      bottom:0,
      left: 0,
      right: 0,
      borderRadius:showMenu ? 15 :0,
      //transform
      transform:[
        {scale:scaleValue},
        {translateX:offsetValue}
      ]
    }}>
      { 
      //menu 
      }
    <Animated.View style={{
      transform:[{
        translateY:closeButtonOffset
      }],
      flexDirection:'row',
    }}>
    <TouchableOpacity onPress={()=>{
          //작동 구현 
          Animated.timing(scaleValue,{
            toValue: showMenu? 1:0.88,
            duration:500,
            useNativeDriver: true
          })
            .start()
          Animated.timing(offsetValue,{
           toValue:showMenu ? 0:230,
           duration:500,
           useNativeDriver:true
          })
          .start()
         
          Animated.timing(closeButtonOffset,{
            toValue:!showMenu ? -30: 0,
            duration:500,
            useNativeDriver:true
           })
           .start()

            setShowMenu(!showMenu);
     }}>

       <Image source={showMenu ? closeIcon : menuIcon} style={{
         width:20,
         height:20,
         tintColor:'black',
         margin : 10,
         marginTop:40,
         marginBottom:40,
         justifyContent:'center',
         alignItems:'center',
         alignSelf:'stretch',
       }}></Image>

      </TouchableOpacity>

      

       <Text style={{
         width:200,
         height:45,
         marginTop:40,
         marginBottom:20,
         marginLeft:'22%',
         fontWeight:'bold',
         fontSize:27,
         justifyContent:'center',
         alignItems:'center',
         alignSelf:'stretch',}}>
         동서울대학교
       </Text>
    </Animated.View>
    <View style={{flexDirection:'row', flex : 1,alignItems:'flex-start'}} >

<Tab.Navigator
  initialRouteName="Home"
  activeColor="#f0edf6"
  inactiveColor="#DCDCDC"
  barStyle={{ backgroundColor: '#009387' }}
>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '출석체크',
          tabBarColor: '#D3D3D3',
          
          tabBarIcon: ({ color }) => (
            <Icon name="school-outline" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={NoticeScreen}
        options={{
          tabBarLabel: '공지사항',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="bullhorn-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={FoodScreen}
        options={{
          tabBarLabel: '학식',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="food" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
         

          </View>

  

     </Animated.View>
 
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  sname: {
    justifyContent:'center',
    alignItems:'center',
    textAlign: 'center',
    fontSize: 10,
    fontStyle: 'italic',
    marginTop: '1%',
    marginBottom: '8%',
    fontWeight: 'bold',
    color: 'black',
    alignSelf:'stretch',
    
  },
  logoutButton: {
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'stretch',    
    width: 70,
    padding: 2,    
    backgroundColor: '#ff3333',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15
  },
  container: {
    marginTop:20,
    height: '100%',
    width: '100%',

  },
  buttonText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  drawercontainer:{
    flex: 1,
    backgroundColor: '#009387',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
