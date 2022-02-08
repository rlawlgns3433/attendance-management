import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image, 
  Dimensions ,} from 'react-native';

const images=[
  'https://postfiles.pstatic.net/MjAyMTEwMDJfODYg/MDAxNjMzMTU3NDMyNTY3.oLiu0BL9GWRTvBsQ6sruxY1oFW-ujmCNMKfQhY9Mmmkg.pLjODmSZAKv3unzabpiMC5OpsIhdhxwopzKtfmPJ-Tsg.PNG.qwe999333/10mon.PNG?type=w773',
  'https://postfiles.pstatic.net/MjAyMTEwMDJfMjMg/MDAxNjMzMTU3NDM2NDg2.-YiFxcIdDU39Z197jK1PJSbHeKc71F6glhKCH7Ikd0wg.EhS34lnAg47i-ujJ3iQ3wf8-AxxYcjsxDkkndzRWu70g.PNG.qwe999333/11mon.PNG?type=w773'
]
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const FoodScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView 
      
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.wrap}>
         {
           images.map((e,index)=>

           
         <Image
          key={e}
          resizeMode='stretch'
          style={styles.wrap}
          source={{uri:e}}
         
         />
         
         )
         }
        </ScrollView>
        <View style={styles.wrapDot}>
          {
            images.map((e,index)=>
            <Text 
            key={e}
            >
              
            </Text>
            )
          }
        </View>
      </View>
    </SafeAreaView>
  );

};

export default FoodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor : '#ffffff'
  },
  
  wrap:{
    width:WIDTH*0.9,
    height:HEIGHT*0.7
     
  },
  wrapDot:{
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    alignSelf:'center'
  },
  dotActive:{
    margin:3,
    color:'#696969',
  },
  dot:{
    margin:3,
    color:'#fff'
  }
});
