import React,{ useState, useEffect } from 'react';
import { View, Text, Button, StatusBar,Animated,
  Platform,StyleSheet, Alert, RefreshControl,
   TouchableOpacity, SafeAreaView, ScrollView, Dimensions, UIManager,Linking, LayoutAnimation} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as firebase from 'firebase';
import moment from 'moment';
import * as data from '../lecture.json';
import Clock  from './Clock';
import { getUserInfo } from '../API/firebaseMethods';

const  CONTENT =[
  {
    isExpanded :false,
    category_name:'과목선택',
    subCategory:[
     {id:1,val:data.lectureinfo[0].lname},
     {id:2,val:data.lectureinfo[1].lname},
     {id:3,val:data.lectureinfo[2].lname},
     {id:4,val:data.lectureinfo[3].lname},
     {id:5,val:data.lectureinfo[4].lname},
     {id:6,val:data.lectureinfo[5].lname},
     {id:7,val:data.lectureinfo[12].lname},
    ]
  }];

{  /*
const  CONTENT =[
  {
    isExpanded :false,
    category_name:'과목선택',
    subCategory:[
     {id:1,val:data.lectureinfo[7].lname},
     {id:2,val:data.lectureinfo[8].lname},
     {id:3,val:data.lectureinfo[9].lname},
     {id:4,val:data.lectureinfo[10].lname},
     {id:5,val:data.lectureinfo[11].lname},
     {id:6,val:data.lectureinfo[12].lname},
     
    ]
  }];
*/}

const WIDTH = Dimensions.get('window').width;
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({navigation}) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongtitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [_1stlatitude, set1stLatitude] = useState(null);
  const [_1stlongitude, set1stLongitude] = useState(null);
  const [starttime, setStartTime] = useState(null);
  const [endtime, setEndTime] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const theme = useTheme();


  const onRefresh = React.useCallback(() => {
    let location1 = Location.getCurrentPositionAsync({});
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const [multiSelect,setmultiSelect] = useState(false);
  const [listDataSource,setlistDataSource] = useState(CONTENT);
  
  if(Platform.OS === 'android'){
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const updateLayout=(index)=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array=[...listDataSource];
    if(multiSelect){
      array[index]['isExpanded']=!array[index]['isExpanded'];
    }
    else{
      array.map((value,placeindex)=>
      placeindex ===index
      ?(array[placeindex]['isExpanded'])=!array[placeindex]['isExpanded']
      :(array[placeindex]['isExpanded'])= false
      
      
      );
    
    }
    setlistDataSource(array)
  }

  
const ExpandableComponet = ({item,onClickFunction})=>{
  const [layoutHeight,setlayoutHeight] = useState(0);
 useEffect(()=>{
   if(item.isExpanded){
     setlayoutHeight(null);
   }else{
     setlayoutHeight(0);
     }
   
 },[item.isExpanded])


  return(
    <View>
      <TouchableOpacity style={styles.item}
      onPress={onClickFunction}>
        <Text style={styles.itemText}>
          {item.category_name}
        </Text>
      </TouchableOpacity>
      <View style={{
        height:layoutHeight,
        overflow:'hidden'
      }}>
        {
          item.subCategory.map((item,key)=>(
            <TouchableOpacity
            
            key={key}
            style={styles.content}
            onPress={()=>{
              if(item.id == 1){빅데이터()}
              else if (item.id == 2) {졸작()}
              else if (item.id == 3) {모바일()}
              else if (item.id == 4) {JSP()}
              else if (item.id == 5) {창업()}
              else if (item.id == 6) {영어()}
              else if (item.id == 7) {객체지향설계()}
            }}>
             <Text style={styles.text}>
               {key+1}. {item.val}
             </Text>
             <View style={styles.separator}/>
            </TouchableOpacity>
          ))
        }
        
      </View>
    </View>
  )
}


let day = new Date().getDay();
// B반 Function
async function 빅데이터(){
  if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
  }
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access latitude was denied');
    return;
  }
  else{
  let location = await Location.getCurrentPositionAsync({});
  Number(setLatitude(location.coords.latitude)).toFixed(4);
  Number(setLongtitude(location.coords.longitude)).toFixed(4);


  try{
    if (errorMsg) {
      text = errorMsg;
    } else if (
    day == data.lectureinfo[0].day
    &&data.lectureinfo[0].starttime>=moment().format('HHmmss') 
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[0].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[0].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[0].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[0].longitude - 0.009) 
    {
     // text ='출석';
      Alert.alert('출석','정상 출석 완료되었습니다.'.concat(moment().format('HH시 mm분 ss초')));
      //lati_text = latitude;
      //longi_text = longitude;
    } else if(
    day == data.lectureinfo[0].day
    &&data.lectureinfo[0].starttime<=moment().format('HHmmss') && data.lectureinfo[0].endtime>=moment().format('HHmmss')
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[0].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[0].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[0].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[0].longitude - 0.009)
    {
      //lati_text = latitude;
      //longi_text = longitude;
      Alert.alert('지각','지각 처리되었습니다.'.concat(moment().format('HHmmss')));
     // text = '지각';
    }else if(day != data.lectureinfo[0].day)
    {
        Alert.alert('요일/위치 확인','요일 및 위치를 확인하세요.');
    }else{
      Alert.alert('결석', '결석입니다.');
    }
  }catch(error){
    Alert.alert('catch the error');
  }
}
}

async function 졸작(){
  if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
  }
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access latitude was denied');
    return;
  }
  else{
  let location = await Location.getCurrentPositionAsync({});
  Number(setLatitude(location.coords.latitude)).toFixed(4);
  Number(setLongtitude(location.coords.longitude)).toFixed(4);


  try{
    if (errorMsg) {
      text = errorMsg;
    } else if (
    day == data.lectureinfo[1].day
    &&data.lectureinfo[1].starttime>=moment().format('HHmmss') 
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[1].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[1].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[1].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[1].longitude - 0.009) 
    {
     // text ='출석';
      Alert.alert('출석','정상 출석 완료되었습니다.'.concat(moment().format('HH시 mm분 ss초')));

      //lati_text = latitude;
      //longi_text = longitude;
    } else if(
    day == data.lectureinfo[1].day
    &&data.lectureinfo[1].starttime<=moment().format('HHmmss') && data.lectureinfo[1].endtime>=moment().format('HHmmss')
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[1].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[1].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[1].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[1].longitude - 0.009)
    {
      //lati_text = latitude;
      //longi_text = longitude;
      Alert.alert('지각','지각 처리되었습니다.'.concat(moment().format('HH시 mm분 ss초')));
     // text = '지각';
    }else if(day != data.lectureinfo[1].day)
    {
        Alert.alert('요일/위치 확인','요일 및 위치를 확인하세요.')
    }else{
      Alert.alert('결석', '결석입니다.');
    }
  }catch(error){
    Alert.alert('catch the error');
  }
}
}

async function 모바일(){
  if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
  }
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access latitude was denied');
    return;
  }
  else{
  let location = await Location.getCurrentPositionAsync({});
  Number(setLatitude(location.coords.latitude)).toFixed(4);
  Number(setLongtitude(location.coords.longitude)).toFixed(4);


  try{
    if (errorMsg) {
      text = errorMsg;
    } else if (
    day == data.lectureinfo[2].day
    &&data.lectureinfo[2].starttime>=moment().format('HHmmss') 
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[2].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[2].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[2].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[2].longitude - 0.009) 
    {
     // text ='출석';
      Alert.alert('출석','정상 출석 완료되었습니다.'.concat(moment().format('HH시 mm분 ss초')));

      //lati_text = latitude;
      //longi_text = longitude;
    } else if(
    day == data.lectureinfo[2].day
    &&data.lectureinfo[2].starttime<=moment().format('HHmmss') && data.lectureinfo[2].endtime>=moment().format('HHmmss')
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[2].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[2].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[2].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[2].longitude - 0.009)
    {
      //lati_text = latitude;
      //longi_text = longitude;
      Alert.alert('지각','지각 처리되었습니다.');
     // text = '지각';
    }else if(day != data.lectureinfo[2].day)
    {
        Alert.alert('요일/위치 확인','요일 및 위치를 확인하세요.');
    }else{
      Alert.alert('결석', '결석입니다.');
    }
  }catch(error){
    Alert.alert('catch the error');
  }
}
}

async function JSP(){
  if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
  }
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access latitude was denied');
    return;
  }
  else{
  let location = await Location.getCurrentPositionAsync({});
  Number(setLatitude(location.coords.latitude)).toFixed(4);
  Number(setLongtitude(location.coords.longitude)).toFixed(4);


  try{
    if (errorMsg) {
      text = errorMsg;
    } else if (
    day == data.lectureinfo[3].day
    &&data.lectureinfo[3].starttime>=moment().format('HHmmss') 
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[3].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[3].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[3].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[3].longitude - 0.009) 
    {
     // text ='출석';
      Alert.alert('출석','정상 출석 완료되었습니다.'.concat(moment().format('HH시 mm분 ss초')));

      //lati_text = latitude;
      //longi_text = longitude;
    } else if(
    day == data.lectureinfo[3].day
    &&data.lectureinfo[3].starttime<=moment().format('HHmmss') && data.lectureinfo[3].endtime>=moment().format('HHmmss')
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[3].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[3].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[3].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[3].longitude - 0.009)
    {
      //lati_text = latitude;
      //longi_text = longitude;
      Alert.alert('지각','지각 처리되었습니다.'.concat(moment().format('HH시 mm분 ss초')));
     // text = '지각';
    }else if(day != data.lectureinfo[3].day)
    {
        Alert.alert('요일/위치 확인','요일 및 위치를 확인하세요.')
    }else{
      Alert.alert('결석', '결석입니다.');
    }
  }catch(error){
    Alert.alert('catch the error');
  }
}
}

async function 창업(){
  if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
  }
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access latitude was denied');
    return;
  }
  else{
  let location = await Location.getCurrentPositionAsync({});
  Number(setLatitude(location.coords.latitude)).toFixed(4);
  Number(setLongtitude(location.coords.longitude)).toFixed(4);


  try{
    if (errorMsg) {
      text = errorMsg;
    } else if (
    day == data.lectureinfo[4].day
    &&data.lectureinfo[4].starttime>=moment().format('HHmmss') 
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[4].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[4].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[4].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[4].longitude - 0.009) 
    {
     // text ='출석';
      Alert.alert('출석','정상 출석 완료되었습니다.'.concat(moment().format('HH시 mm분 ss초')));

      //lati_text = latitude;
      //longi_text = longitude;
    } else if(
    day == data.lectureinfo[4].day
    && data.lectureinfo[4].starttime<=moment().format('HHmmss') 
    && data.lectureinfo[4].endtime>=moment().format('HHmmss')
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[4].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[4].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[4].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[4].longitude - 0.009)
    {
      //lati_text = latitude;
      //longi_text = longitude;
      Alert.alert('지각','지각 처리되었습니다.'.concat(moment().format('HH시 mm분 ss초')));
     // text = '지각';
    }else if(day != data.lectureinfo[4].day)
    {
        Alert.alert('요일/위치 확인','요일 및 위치를 확인하세요.')
    }else{
      Alert.alert('결석', '결석입니다.');
    }
  }catch(error){
    Alert.alert('catch the error');
  }
}
}

async function 영어(){
  if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
  }
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access latitude was denied');
    return;
  }
  else{
  let location = await Location.getCurrentPositionAsync({});
  Number(setLatitude(location.coords.latitude)).toFixed(4);
  Number(setLongtitude(location.coords.longitude)).toFixed(4);


  try{
    if (errorMsg) {
      text = errorMsg;
    } else if (
    day == data.lectureinfo[5].day
    &&data.lectureinfo[5].starttime>=moment().format('HHmmss') 
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[5].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[5].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[5].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[5].longitude - 0.009) 
    {
     // text ='출석';
      Alert.alert('출석','정상 출석 완료되었습니다.'.concat(moment().format('HH시 mm분 ss초')));

      //lati_text = latitude;
      //longi_text = longitude;
    } else if(
    day == data.lectureinfo[5].day
    &&data.lectureinfo[5].starttime<=moment().format('HHmmss') && data.lectureinfo[5].endtime>=moment().format('HHmmss')
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[5].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[5].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[5].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[5].longitude - 0.009)
    {
      //lati_text = latitude;
      //longi_text = longitude;
      Alert.alert('지각','지각 처리되었습니다.'.concat(moment().format('HH시 mm분 ss초')));
     // text = '지각';
    }else if(day != data.lectureinfo[5].day)
    {
        Alert.alert('요일/위치 확인','요일 및 위치를 확인하세요.')
    }else{
      Alert.alert('결석', '결석입니다.');
    }
  }catch(error){
    Alert.alert('catch the error');
  }
}
}

async function 객체지향설계(){
  if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
  }
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access latitude was denied');
    return;
  }
  else{
  let location = await Location.getCurrentPositionAsync({});
  Number(setLatitude(location.coords.latitude)).toFixed(4);
  Number(setLongtitude(location.coords.longitude)).toFixed(4);


  try{
    if (errorMsg) {
      text = errorMsg;
    } else if (
    day == data.lectureinfo[12].day
    &&data.lectureinfo[12].starttime>=moment().format('HHmmss') 
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[12].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[12].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[12].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[12].longitude - 0.009) 
    {
     // text ='출석';
      Alert.alert('출석','정상 출석 완료되었습니다.'.concat(moment().format('HH시 mm분 ss초')));

      //lati_text = latitude;
      //longi_text = longitude;
    } else if(
    day == data.lectureinfo[12].day
    &&data.lectureinfo[12].starttime<=moment().format('HHmmss') && data.lectureinfo[12].endtime>=moment().format('HHmmss')
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[12].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[12].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[12].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[12].longitude - 0.009)
    {
      //lati_text = latitude;
      //longi_text = longitude;
      Alert.alert('지각','지각 처리되었습니다.'.concat(moment().format('HH시 mm분 ss초')));
     // text = '지각';
    }else if(day != data.lectureinfo[12].day)
    {
        Alert.alert('요일/위치 확인','요일 및 위치를 확인하세요.')
    }else{
      Alert.alert('결석', '결석입니다.');
    }
  }catch(error){
    Alert.alert('catch the error');
  }
}
}

// A반 Function
async function 졸업작품설계A(){
  if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
  }
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access latitude was denied');
    return;
  }
  else{
  let location = await Location.getCurrentPositionAsync({});
  Number(setLatitude(location.coords.latitude)).toFixed(4);
  Number(setLongtitude(location.coords.longitude)).toFixed(4);


  try{
    if (errorMsg) {
      text = errorMsg;
    } else if (
    day == data.lectureinfo[7].day
    &&data.lectureinfo[7].starttime>=moment().format('HHmmss') 
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[7].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[7].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[7].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[7].longitude - 0.009) 
    {
     // text ='출석';
      Alert.alert('출석','정상 출석 완료되었습니다.'.concat(moment().format('HH시 mm분 ss초')));
      //lati_text = latitude;
      //longi_text = longitude;
    } else if(
    day == data.lectureinfo[7].day
    &&data.lectureinfo[7].starttime<=moment().format('HHmmss') && data.lectureinfo[7].endtime>=moment().format('HHmmss')
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[7].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[7].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[7].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[7].longitude - 0.009)
    {
      //lati_text = latitude;
      //longi_text = longitude;
      Alert.alert('지각','지각 처리되었습니다.'.concat(moment().format('HHmmss')));
     // text = '지각';
    }else if(day != data.lectureinfo[7].day)
    {
        Alert.alert('요일/위치 확인','요일 및 위치를 확인하세요.');
    }else{
      Alert.alert('결석', '결석입니다.');
    }
  }catch(error){
    Alert.alert('catch the error');
  }
}
}

async function 창업A(){
  if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
  }
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access latitude was denied');
    return;
  }
  else{
  let location = await Location.getCurrentPositionAsync({});
  Number(setLatitude(location.coords.latitude)).toFixed(4);
  Number(setLongtitude(location.coords.longitude)).toFixed(4);


  try{
    if (errorMsg) {
      text = errorMsg;
    } else if (
    day == data.lectureinfo[8].day
    &&data.lectureinfo[8].starttime>=moment().format('HHmmss') 
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[8].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[8].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[8].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[8].longitude - 0.009) 
    {
     // text ='출석';
      Alert.alert('출석','정상 출석 완료되었습니다.'.concat(moment().format('HH시 mm분 ss초')));
      //lati_text = latitude;
      //longi_text = longitude;
    } else if(
    day == data.lectureinfo[8].day
    &&data.lectureinfo[8].starttime<=moment().format('HHmmss') && data.lectureinfo[8].endtime>=moment().format('HHmmss')
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[8].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[8].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[8].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[8].longitude - 0.009)
    {
      //lati_text = latitude;
      //longi_text = longitude;
      Alert.alert('지각','지각 처리되었습니다.'.concat(moment().format('HHmmss')));
     // text = '지각';
    }else if(day != data.lectureinfo[8].day)
    {
        Alert.alert('요일/위치 확인','요일 및 위치를 확인하세요.');
    }else{
      Alert.alert('결석', '결석입니다.');
    }
  }catch(error){
    Alert.alert('catch the error');
  }
}
}

async function 빅데이터A(){
  if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
  }
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access latitude was denied');
    return;
  }
  else{
  let location = await Location.getCurrentPositionAsync({});
  Number(setLatitude(location.coords.latitude)).toFixed(4);
  Number(setLongtitude(location.coords.longitude)).toFixed(4);


  try{
    if (errorMsg) {
      text = errorMsg;
    } else if (
    day == data.lectureinfo[9].day
    &&data.lectureinfo[9].starttime>=moment().format('HHmmss') 
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[9].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[9].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[9].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[9].longitude - 0.009) 
    {
     // text ='출석';
      Alert.alert('출석','정상 출석 완료되었습니다.'.concat(moment().format('HH시 mm분 ss초')));
      //lati_text = latitude;
      //longi_text = longitude;
    } else if(
    day == data.lectureinfo[9].day
    &&data.lectureinfo[9].starttime<=moment().format('HHmmss') && data.lectureinfo[9].endtime>=moment().format('HHmmss')
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[9].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[9].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[9].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[9].longitude - 0.009)
    {
      //lati_text = latitude;
      //longi_text = longitude;
      Alert.alert('지각','지각 처리되었습니다.'.concat(moment().format('HHmmss')));
     // text = '지각';
    }else if(day != data.lectureinfo[9].day)
    {
        Alert.alert('요일/위치 확인','요일 및 위치를 확인하세요.');
    }else{
      Alert.alert('결석', '결석입니다.');
    }
  }catch(error){
    Alert.alert('catch the error');
  }
}
}
  
async function 객체지향A(){
  if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
  }
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access latitude was denied');
    return;
  }
  else{
  let location = await Location.getCurrentPositionAsync({});
  Number(setLatitude(location.coords.latitude)).toFixed(4);
  Number(setLongtitude(location.coords.longitude)).toFixed(4);


  try{
    if (errorMsg) {
      text = errorMsg;
    } else if (
    day == data.lectureinfo[10].day
    &&data.lectureinfo[10].starttime>=moment().format('HHmmss') 
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[10].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[10].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[10].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[10].longitude - 0.009) 
    {
     // text ='출석';
      Alert.alert('출석','정상 출석 완료되었습니다.'.concat(moment().format('HH시 mm분 ss초')));
      //lati_text = latitude;
      //longi_text = longitude;
    } else if(
    day == data.lectureinfo[10].day
    &&data.lectureinfo[10].starttime<=moment().format('HHmmss') && data.lectureinfo[10].endtime>=moment().format('HHmmss')
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[10].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[10].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[10].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[10].longitude - 0.009)
    {
      //lati_text = latitude;
      //longi_text = longitude;
      Alert.alert('지각','지각 처리되었습니다.'.concat(moment().format('HHmmss')));
     // text = '지각';
    }else if(day != data.lectureinfo[10].day)
    {
        Alert.alert('요일/위치 확인','요일 및 위치를 확인하세요.');
    }else{
      Alert.alert('결석', '결석입니다.');
    }
  }catch(error){
    Alert.alert('catch the error');
  }
}
}

async function JSP_A(){
  if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
  }
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access latitude was denied');
    return;
  }
  else{
  let location = await Location.getCurrentPositionAsync({});
  Number(setLatitude(location.coords.latitude)).toFixed(4);
  Number(setLongtitude(location.coords.longitude)).toFixed(4);


  try{
    if (errorMsg) {
      text = errorMsg;
    } else if (
    day == data.lectureinfo[11].day
    &&data.lectureinfo[11].starttime>=moment().format('HHmmss') 
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[11].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[11].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[11].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[11].longitude - 0.009) 
    {
     // text ='출석';
      Alert.alert('출석','정상 출석 완료되었습니다.'.concat(moment().format('HH시 mm분 ss초')));
      //lati_text = latitude;
      //longi_text = longitude;
    } else if(
    day == data.lectureinfo[11].day
    &&data.lectureinfo[11].starttime<=moment().format('HHmmss') && data.lectureinfo[11].endtime>=moment().format('HHmmss')
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[11].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[11].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[11].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[11].longitude - 0.009)
    {
      //lati_text = latitude;
      //longi_text = longitude;
      Alert.alert('지각','지각 처리되었습니다.'.concat(moment().format('HHmmss')));
     // text = '지각';
    }else if(day != data.lectureinfo[11].day)
    {
        Alert.alert('요일/위치 확인','요일 및 위치를 확인하세요.');
    }else{
      Alert.alert('결석', '결석입니다.');
    }
  }catch(error){
    Alert.alert('catch the error');
  }
}
}

async function Mob_A(){
  if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
  }
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access latitude was denied');
    return;
  }
  else{
  let location = await Location.getCurrentPositionAsync({});
  Number(setLatitude(location.coords.latitude)).toFixed(4);
  Number(setLongtitude(location.coords.longitude)).toFixed(4);


  try{
    if (errorMsg) {
      text = errorMsg;
    } else if (
    day == data.lectureinfo[12].day
    &&data.lectureinfo[12].starttime>=moment().format('HHmmss') 
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[12].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[12].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[12].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[12].longitude - 0.009) 
    {
     // text ='출석';
      Alert.alert('출석','정상 출석 완료되었습니다.'.concat(moment().format('HH시 mm분 ss초')));
      //lati_text = latitude;
      //longi_text = longitude;
    } else if(
    day == data.lectureinfo[12].day
    &&data.lectureinfo[12].starttime<=moment().format('HHmmss') && data.lectureinfo[12].endtime>=moment().format('HHmmss')
    && Number(location.coords.latitude).toFixed(4) <= data.lectureinfo[12].latitude + 0.009
    && Number(location.coords.latitude).toFixed(4) >= data.lectureinfo[12].latitude - 0.009
    && Number(location.coords.longitude).toFixed(4) <= data.lectureinfo[12].longitude + 0.009
    && Number(location.coords.longitude).toFixed(4) >= data.lectureinfo[12].longitude - 0.009)
    {
      //lati_text = latitude;
      //longi_text = longitude;
      Alert.alert('지각','지각 처리되었습니다.'.concat(moment().format('HHmmss')));
     // text = '지각';
    }else if(day != data.lectureinfo[12].day)
    {
        Alert.alert('요일/위치 확인','요일 및 위치를 확인하세요.');
    }else{
      Alert.alert('결석', '결석입니다.');
    }
  }catch(error){
    Alert.alert('catch the error');
  }
}
}

    return (

        
        <SafeAreaView style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <ScrollView
          style = {{    
            borderWidth : 2,
            borderRadius : 15,
            margin : 25,
            borderColor : "#009387"}}
          refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.clock}><Clock/></View>

        <View>
        <ScrollView>
        {
          listDataSource.map((item,key) =>(
            <ExpandableComponet
            key={item.category_name}
                item={item}
                onClickFunction={()=>{
                  updateLayout(key)
                }}
            />
          ))
        }
        </ScrollView>


            
         </View>      
       </ScrollView>
      </SafeAreaView>

    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor : "#fff",

  },
  text :{
    fontSize:15,
    borderWidth:1,
    padding:5
  },
  roundButton2: {
    marginTop: 20,
    marginLeft:50,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#009387',
    borderWidth:1.5,
    borderColor:'#009387'
  },
  clock: {
    width : WIDTH*0.8,
    marginLeft : 10,
    alignItems: 'flex-start', 
    justifyContent: 'flex-start',
  },
  header:{
    flexDirection:'row',
    marginTop:20,
 },
 titleText:{
   flex:1,
   fontSize:22,
   fontWeight:'bold',
   marginLeft:10,
 
 },
 headerButton:{
   textAlign:'center',
   justifyContent:'center',
   fontSize:18,
   marginRight:10
 },
 item:{
   backgroundColor:'#009387',
   padding:20,
   borderRadius:10,
   margin:10
 },
 itemText:{
   fontSize:17,
   fontWeight:'bold',
   color : "white"
 },
 content:{
   paddingLeft:10,
   paddingRight:10,
   backgroundColor:'#fff'
 },
 text:{
   fontSize:16,
   padding:10
 },
 separator:{
   height:0.5,
   backgroundColor:'#c8c8c8',
   width:'100%'
 }
});
