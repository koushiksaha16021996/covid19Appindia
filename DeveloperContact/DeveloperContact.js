import React, { useState ,useEffect} from 'react';
import { Text, View,  ImageBackground, Image ,ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { useIsFocused } from '@react-navigation/core';
import axios from 'axios';
import { useSafeArea } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import covidpic from '../image/covidpic.jpg'
import devpic from '../image/devpic.jpg'
import { Ionicons , AntDesign , } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';


export default function DeveloperContact() {
  const insets = useSafeArea();
  const isfocused= useIsFocused()
  const [comments,setcomments]=useState([])
  const [isLiked,setisLiked] = useState(false)
  const [noOflike,setnoOflike] =useState([])
  const [views,setviews] =useState([])
  const [comm,setcomm]=useState({
    "name":"",
    "comments":""
  })
  let param=new URLSearchParams();
  let params=new URLSearchParams();
  useEffect(()=>{
    axios.get("https://us-central1-vitaltracker-native-serv-7f2d5.cloudfunctions.net/app/getcomments").then(res=>{
      setcomments(res.data)
    })
    AsyncStorage.getItem("liked").then(data=>{
      if(data==null){
        setisLiked(false)
        
      }
      else{
        setisLiked(true)
        
      }
    })
    axios.get("https://us-central1-vitaltracker-native-serv-7f2d5.cloudfunctions.net/app/getlike").then(res=>{
        setnoOflike(res.data)
    })
    axios.get("https://us-central1-vitaltracker-native-serv-7f2d5.cloudfunctions.net/app/getview").then(res=>{
      setviews(res.data)
    })
  },[isfocused])
  const liked=(bool)=>{
    setisLiked(bool)
    if(bool){
      AsyncStorage.setItem("liked","done")

      param.append("react", "true")

      axios.post("https://us-central1-vitaltracker-native-serv-7f2d5.cloudfunctions.net/app/liked" , param,{
        headers:{
        'content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res=>{
        // console.warn(res.data?._id)
        axios.get("https://us-central1-vitaltracker-native-serv-7f2d5.cloudfunctions.net/app/getlike").then(res=>{
        setnoOflike(res.data)
        })
        AsyncStorage.setItem("likeID",res.data?._id)
      })
      
    }
    else{
      AsyncStorage.getItem("likeID").then(data=>{
        axios.delete(`https://us-central1-vitaltracker-native-serv-7f2d5.cloudfunctions.net/app/dellike/${data}`).then(res=>{
          setnoOflike(res.data)
        })
      })
      AsyncStorage.removeItem("likeID")
      AsyncStorage.removeItem("liked")
    }
  }
  const posts=()=>{
    if(comm.name.length!=0 && comm.comments.length!=0 && comm.name.charAt(0)!=" " && comm.comments.charAt(0)!=" "){
      params.append("name", comm.name)
      params.append("comments",comm.comments)
      axios.post("https://us-central1-vitaltracker-native-serv-7f2d5.cloudfunctions.net/app/newComment" , params , {
        headers:{
        'content-Type': 'application/x-www-form-urlencoded'
        }}).then(res=>{
          // console.warn(comm)
        axios.get("https://us-central1-vitaltracker-native-serv-7f2d5.cloudfunctions.net/app/getcomments").then(res=>{
        setcomments(res.data)
        })
          setcomm({
            "name":"",
            "comments":""
          })

      })
    }
    else{
      alert("Please enter the required field")
    }    
  }
  return (
    <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, width: "100%",height:'100%',alignItems:'center',justifyContent:'center'}}>
      
      <ImageBackground resizeMode="cover" source={covidpic} blurRadius={2.8} style={{ width: "100%",height:'100%',alignItems:'center',justifyContent:'center'}}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{x: 1, y: 1 }} colors={[ '#12c2e9', '#c471ed', '#FF0080' ]} style={{width:'70%',height:'75%',alignItems:'center',borderRadius:8}}>
          
          <BlurView style={{height:100,width:100,top:-50,borderRadius:55,position:"absolute",zIndex:1,elevation:20,alignItems:'center',justifyContent:'center'}}>
            <View style={{backgroundColor:"white",height:"95%",width:"95%",borderRadius:55}}>
              <Image resizeMode="cover" source={devpic} style={{height:"100%",width:"100%",borderRadius:55}}/>
            </View>
          </BlurView>
          <View style={{height:"14%",width:"100%"}}>
          </View>
          <View style={{height:"10%",width:"100%",alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>Koushik Saha</Text>
          </View>
          <View style={{height:"8%",width:"100%",alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'white',fontSize:15}}>Mobile App Developer</Text>
          </View>
          
          <BlurView style={{height:"43%",width:"100%",alignItems:'center',padding:2,borderTopLeftRadius:10,borderTopRightRadius:10}}>
            <View style={{height:"25%",width:"100%",alignItems:'center',justifyContent:'space-around',backgroundColor:'transparent',flexDirection:'row',borderBottomWidth:1,borderBottomColor:'white'}}>
              <View style={{alignItems:'center',justifyContent:'center',borderRightWidth:1,borderRightColor:'white',width:"50%"}}>
                <View>{!isLiked ? <AntDesign name="hearto" size={25} color="white" onPress={()=>liked(true)}/> :<AntDesign name="heart" size={25} color="red" onPress={()=>liked(false)}/>}</View>
                <Text style={{color:'red',fontSize:17,fontWeight:'bold'}}>{noOflike.length}</Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',width:"50%"}}>
                <View>
                  <Ionicons name="eye" size={26} color="blue" />
                </View>
                <Text style={{color:'blue',fontSize:17,fontWeight:'bold'}}>{views.length}</Text>
              </View>
            </View>
            <View style={{height:"75%",width:"100%",alignItems:'center',backgroundColor:'transparent'}}>
              <View style={{height:"20%",width:"100%",alignItems:'center',justifyContent:'center',padding:5}}>
                <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>All Comments</Text>
              </View>
              <ScrollView style={{height:"80%",width:"100%"}} showsVerticalScrollIndicator={false}>
                {comments.map((item,index)=><View key={index} style={{width:"100%",padding:1,flexDirection:'row'}}>
                <View style={{justifyContent:'center',alignItems:'center',width:'10%'}}>
                  <Ionicons name="person-circle" size={28} color="black" />
                </View>
                  <View style={{justifyContent:'center',width:'90%',backgroundColor: "white",borderTopLeftRadius:5,borderTopRightRadius:5,borderBottomEndRadius:5,padding:3}}>
                    <Text style={{color:'black',fontSize:18,fontWeight:'bold'}}>{item?.Name}</Text>
                    <Text style={{color:'black',fontSize:12}}>{item?.Comments}</Text>
                  </View>
                </View>)}
              </ScrollView>
            </View>
          </BlurView>
          <View style={{height:"25%",width:"100%",borderBottomLeftRadius:8,borderBottomRightRadius:8,backgroundColor:'#4c75f2' , padding :5,justifyContent:'space-around'}}>
            <TextInput placeholder="Your name" value={comm.name} style={{height:"30%",width:"100%",backgroundColor:'white',borderBottomWidth:1,borderRadius:5,padding:2}} onChangeText={text=>setcomm({...comm,name:text})}/>
            <TextInput placeholder="Your Comments" value={comm.comments} style={{height:"35%",width:"100%",backgroundColor:'white',borderBottomWidth:1,borderRadius:5,padding:2}} onChangeText={text=>setcomm({...comm,comments:text})}/>
            <TouchableOpacity onPress={()=>posts()}  style={{height:"30%",width:"100%",backgroundColor:'#4c75f2',alignItems:'center',borderRadius:8,justifyContent:'center'}}>
              <View style={{height:"100%",width:"60%",backgroundColor:'#28a745',alignItems:'center',borderRadius:8,justifyContent:'center'}}>
                <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>post your comments</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

  