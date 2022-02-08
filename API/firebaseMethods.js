import * as firebase from 'firebase';
import 'firebase/firestore';
import {Alert} from 'react-native';

//학생 테이블 연결
export async function registration(email, password, Name, studentNumber) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const Studentdb = firebase.firestore();
    Studentdb
      .collection('Students')
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        Name: Name,
        studentNumber : studentNumber
      });
  } catch (err) {
    Alert.alert('회원가입 오류', '다시 확인하십시오.');
  }
}

//교수 테이블 연결
/* 필요 시 사용
export async function Professor_registration(email, password, Name, professorNumber,gender) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const Professordb = firebase.firestore();
    Professordb.collection('Professors')
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        Name: Name,
        professorNumber : professorNumber,
        gender, gender,
        phone : phone,
        deaprtment : department,
      });
  } catch (err) {
    Alert.alert('회원가입 오류', '다시 확인하십시오.');
  }
}
*/

export async function signIn(email, password) {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert('알림', '잘못 입력되었습니다.');
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('로그아웃 오류', '로그아웃 오류');
  }
}

