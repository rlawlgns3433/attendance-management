import React,{useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import * as firebase from 'firebase'; 
import {
    useTheme,
    Avatar,
    Caption,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import{ AuthContext } from '../components/context';

export function DrawerContent(props,{navigation}) {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const paperTheme = useTheme();
    const { signOut, toggleTheme } = React.useContext(AuthContext);

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
              setEmail(dataObj.email);
    
            }
          } catch (err){
          Alert.alert('There is an error.', err.message)
          }
        }
        getUserInfo();




    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Text style={styles.title}>{Name}</Text>
                                <Caption style={styles.caption}>{Email}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                        
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="school-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="출석체크"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bullhorn-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="미정1"
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="food" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="미정2"
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        />
                   
                    </Drawer.Section>
                    <Drawer.Section title="옵션 ">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>다크 테마</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="로그아웃"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
