import React, { useState,useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Dimensions, Alert} from 'react-native';
import { ScrollView,  TouchableOpacity } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import * as firebase from 'firebase'; 
import * as data from '../lecture.json';
import { DataTable } from 'react-native-paper';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const currentUser = firebase.auth().currentUser;

const DetailsScreen = (props)=> {
  const [week1, setweek1] = useState();
  const [week2, setweek2] = useState();
  const [stdid, setStdId] = useState();

  function weekState(){
    getWeek1();
    getWeek2();
  }
  
  function getStudentID(){

    try {
      let doc = firebase
        .firestore()
        .collection('Students')
        .doc(currentUserUID)
        .get();

      if (!doc.exists){
        Alert.alert('No Students data found!')
      } else {
        let dataObj = doc.data();
        setStdId(dataObj.studentNumber)

      }
    } catch (err){
    Alert.alert('There is an error.', err.message)
    }
  }

  getStudentID();



    async function getWeek1(){
      try {
        let doc = await firebase
          .firestore()
          .collection('Attendance')
          .doc('3BBigData')
          .collection('211018')
          .doc('1606045')
          .get();

        if (!doc.exists){
          Alert.alert('No Status data found!')
        } else {
          let dataObj = doc.data();
          setweek1(dataObj.week1);
        }
      } catch (err){
      Alert.alert('There is an error.(Status)', err.message)
      }
    }

    if(data.lectureinfo[0].lname == "빅데이터 분석")
    {
      for(index = 0; index < 2; index++)
      {
        if(data.lectureinfo.attendance.week1[index] == stdid)
        {
          DataTable[0][1] = "O";
        }
        else {
          DataTable[0][1] = "X";
        }
      }
    }

  const state = {
    HeadTable: ['주차','빅데이터 분석', '졸업작품 설계', '모바일 프로그래밍', 'JSP', '창업아카데미','영어회화','스크린 영어'],
    DataTable: [
      ['1', week1, week1, week1, week1, week1, week1,week1],
      ['2', 'X','X','X','X','X','X','X'],
      ['3', week1, week1, week1, week1, week1, week1,week1],
      ['4', week1, week1, week1, week1, week1, week1,week1],
      ['5', week1, week1, week1, week1, week1, week1,week1],
      ['6', week1, week1, week1, week1, week1, week1,week1],

    ]
  }
  

    return (


          <SafeAreaView
          style={{
            flex:6,
            width:'100%',
            paddingTop: 35,
            alignItems:'center',
            backgroundColor : "#fff"
          }}>
            <ScrollView
           >
          
          <Table borderStyle={{borderWidth: 1, borderColor: '#009387'}}>
          <Row data={state.HeadTable} style={styles.HeadStyle} textStyle={styles.HeaderText}/>
          <Rows data={state.DataTable} style={styles.DataStyle}textStyle={styles.DataText}/>
        </Table>
  
        </ScrollView>
        </SafeAreaView>

    );


};



const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  btnBg:
    {
      padding:10,borderWidth:1,margin:5,backgroundColor:'#009387',borderRadius:5,
    },
    btnTxt:{fontSize:20,color:'#fff'},
    btnBg1:
    {
      width:100,padding:10,borderWidth:1,margin:10,backgroundColor:'#009387',borderRadius:20,justifyContent:'center',alignItems:'center'
    },

    HeaderText: {
      color:'white',
      margin: 10,
      fontSize:10
    },
    DataText:{
      color:'black',
    },
    DataStyle: {
      alignContent: "center",
      backgroundColor: '#fff',
      ...Platform.select({
        ios: {
          borderWidth:1,
          borderColor:'white',
          width:WIDTH*0.9,
          height:'18%',
},
        android: {
          width:WIDTH*0.9,
          borderWidth:1,
          borderColor:'white',
          height:50,
        },
      }),
    },
    HeadStyle: {
      ...Platform.select({
        ios: {       
          borderWidth:1,
          borderColor:'white',
          width:WIDTH*0.9,
          alignContent: "center",
          backgroundColor: '#009387'},
        android: {
          width:WIDTH*0.9,
          height:50,
          alignContent: "center",
          backgroundColor: '#009387'
        },
      }),
    },
  
});

export default DetailsScreen;