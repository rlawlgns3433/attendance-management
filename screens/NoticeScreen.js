import React,{useState,useEffect} from 'react'
import {
  SafeAreaView,StyleSheet,View,Text,ScrollView,TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Linking
}from 'react-native'
const  CONTENT =[
  {
    isExpanded :false,
    category_name:'공지사항',
    subCategory:[
     {id:1,val:' 2021학년도 2학기 중간고사 안내',ur:'https://dept.du.ac.kr/computer/CMS/Board/Board.do?mCode=MN012&mode=view&mgr_seq=49&board_seq=7737'},
     {id:2,val:'2021학년도 교육과정표, 직무역량 핵심역량 적용 총괄도 (학사)',ur:'https://dept.du.ac.kr/computer/CMS/Board/Board.do?mCode=MN012&mode=view&mgr_seq=49&board_seq=7540'}
    ]
  },
  {
    isExpanded :false,
    category_name:'이용안내',
    subCategory:[
     {id:3,val:'사용 방법',ur:'https://www.du.ac.kr/KR/cms/CM_MJ01_CON/CM_MJ01_V01.do?MENU_SN=654'},
     {id:4,val:'주의 사항',ur:'https://www.du.ac.kr/KR/cms/CM_MJ01_CON/CM_MJ01_V01.do?MENU_SN=654'},
     {id:5,val:'출석체크 사항',ur:'https://www.du.ac.kr/KR/cms/CM_MJ01_CON/CM_MJ01_V01.do?MENU_SN=654'}
    ]
  },
];

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
              if(item.id == 1){Linking.openURL('https://dept.du.ac.kr/computer/CMS/Board/Board.do?mCode=MN012&mode=view&mgr_seq=49&board_seq=7737');}
              else if (item.id == 2) {Linking.openURL('https://dept.du.ac.kr/computer/CMS/Board/Board.do?mCode=MN012&mode=view&mgr_seq=49&board_seq=7540');}
              else if (item.id == 3) {Linking.openURL('https://m.blog.naver.com/PostView.naver?blogId=qwe999333&logNo=222570936621&navType=by');}
              else if (item.id == 4) {Linking.openURL('https://m.blog.naver.com/PostView.naver?blogId=qwe999333&logNo=222570936621&navType=by');}
              else if (item.id == 5) {Linking.openURL('https://m.blog.naver.com/PostView.naver?blogId=qwe999333&logNo=222570936621&navType=by');}
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
const NoticeScreen=(navigation)=>{
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
  return (
   <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
    <View style={styles.container}>
      <View style={styles.header}>
          
          <Text style={styles.titleText}>
            공지사항/이용안내
          </Text>
          <TouchableOpacity
            onPress={() => setmultiSelect(!multiSelect)}
          >
            <Text style={styles.headerButton}>
             {multiSelect}
            </Text>
          </TouchableOpacity>
      </View>
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
   </SafeAreaView>
  )
}

const styles= StyleSheet.create({
container:{
  flex:1,
  borderWidth:2,
  borderRadius:20,
  margin:20,
  backgroundColor:"#ffffff",
  borderColor:'#009387',
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
  margin:10,
  
},
itemText:{
  fontSize:17,
  fontWeight:'bold',
  color:'#ffffff',
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

export default NoticeScreen;