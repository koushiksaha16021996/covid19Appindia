import React, { useState ,useEffect} from 'react';
import { View ,Text ,ImageBackground ,Dimensions ,StyleSheet} from 'react-native';
import { useIsFocused } from '@react-navigation/core';
import { useSafeArea } from 'react-native-safe-area-context';
import covidpic from '../image/covidpic.jpg'
import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from '../utils/animations';
import state from '../states.json';
import axios from 'axios';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo  ,FontAwesome5 } from '@expo/vector-icons';

const SLIDER_WIDTH = Dimensions.get('window').width+66;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

export default function VisitHospital({route}) {
    const insets = useSafeArea();
    const isfocused= useIsFocused()
    const {centerId,date}= route.params
    const [data,setdata]= useState({
        d1: state.states
    })
    const [rawHospitaldata,setrawHospitaldata]=useState({})
    const [hospital,setHospital] = useState([])
    useEffect(()=>{
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=${centerId}&date=${date}`).then(res=>{
            setHospital(res.data.centers.sessions)
            setrawHospitaldata(res.data)
        })
    },[isfocused])
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    
    //console.warn(rawHospitaldata)
    
    const _renderItem=({ item })=> {
      return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{x: 1, y: 1 }} colors={[ '#12c2e9', '#c471ed', '#FF0080' ]} style={styles.itemContainer}>
          {/* <Text style={styles.itemLabel}>{item.date}</Text>
          <Text style={styles.itemLabel}>{item.vaccine}</Text>
          <Text style={styles.itemLabel}>{item.available_capacity_dose1}</Text>
          <Text style={styles.itemLabel}>{item.available_capacity_dose2}</Text>
          */}
          <View style={{height:'79%',width:"100%"}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',borderTopEndRadius:10,borderTopStartRadius:10,height:"5%"}}>
              <View style={{backgroundColor:"red",padding:3,borderRadius:6,justifyContent:"center"}}>
                <Text style={{fontSize:12,color:'white',fontWeight:"bold"}}>{item.date} </Text>
              </View>
              <View style={{height:"100%",alignItems:'center',padding:11,backgroundColor:"#4c75f2",borderRadius:6,justifyContent:'center'}}>
                <Text style={{fontSize:18,color:'white',fontWeight:"bold"}}>{item.vaccine}</Text>
              </View>
              {rawHospitaldata?.centers?.fee_type=="Paid" ?<View style={{backgroundColor:"red",padding:3,borderRadius:6,justifyContent:"center"}}>
                    <Text style={{fontSize:12,color:'white',fontWeight:"bold"}}>{rawHospitaldata?.centers?.fee_type}</Text>
                  </View>: <View style={{backgroundColor:"#4c75f2",padding:3,borderRadius:6,justifyContent:"center"}}>
                    <Text style={{fontSize:12,color:'white',fontWeight:"bold"}}>{rawHospitaldata?.centers?.fee_type}</Text>
              </View>}
            </View>

            <View style={{height:'15%',width:"100%",padding:5}}>
              <View style={{height:'100%',width:"100%",alignItems:'center',flexDirection:'column',justifyContent:'space-around' ,backgroundColor:'transparent',borderRadius:6}}>
                <BlurView style={{height:'100%',width:"100%",alignItems:'center',justifyContent:"center",borderRadius:6}}>
                  <View style={{height:'50%',width:"100%",alignItems:'center',justifyContent:"center"}}>
                    <Text style={{fontSize:18,color:'white',fontWeight:"bold"}}>Vaccine Timming</Text>
                  </View>
                  <View style={{height:'50%',width:"100%",alignItems:'center',justifyContent:"center"}}>
                    <Text style={{fontSize:15,color:'white'}}>From {rawHospitaldata?.centers?.from} To {rawHospitaldata?.centers?.to}</Text>
                  </View>
                </BlurView>
              </View>
            </View>
            <View style={{height:'15%',width:"100%",padding:5}}>
              <View style={{height:'100%',width:"100%",alignItems:'center',backgroundColor:'transparent',borderRadius:6}}>
                <BlurView style={{height:'100%',width:"100%",alignItems:'center',justifyContent:"center",borderRadius:6,flexDirection:'row'}}>
                  <View style={{height:'100%',width:"50%",alignItems:'center',justifyContent:"space-around",borderRightWidth:1,borderRightColor:"white"}}>
                    <Text style={{fontSize:18,color:'white',fontWeight:"bold"}}>Price</Text>
                    <Text style={{fontSize:15,color:'white'}}>INR: {rawHospitaldata?.centers?.vaccine_fees ? rawHospitaldata?.centers?.vaccine_fees[0]?.fee : "N/A"}</Text>
                  </View>
                  <View style={{height:'100%',width:"50%",alignItems:'center',justifyContent:"space-around"}}>
                    <Text style={{fontSize:18,color:'white',fontWeight:"bold",justifyContent:"center"}}>Minimum Age</Text>
                    <Text style={{fontSize:15,color:'white',justifyContent:"center"}}>{item?.min_age_limit}</Text>
                  </View>
                </BlurView>
              </View>
            </View>
            <View style={{height:'25%',width:"100%",padding:5}}>
              <View style={{height:'100%',width:"100%",alignItems:'center',flexDirection:'column',justifyContent:'space-around',backgroundColor:'transparent',borderRadius:6}}>
                <BlurView style={{height:'100%',width:"100%",alignItems:'center',justifyContent:"center",borderRadius:6}}>
                  <View style={{height:'50%',width:"100%",alignItems:'center',justifyContent:"center",borderBottomWidth:1,borderBottomColor:'white'}}>
                    <Text style={{fontSize:18,color:'white',fontWeight:"bold"}}>Vaccine Available Capacity</Text>
                    <Text style={{fontSize:15,color:'white'}}>{item?.available_capacity}</Text>
                  </View>
                  <View style={{height:'50%',width:"100%",alignItems:'center',justifyContent:"center",flexDirection:'row'}}>
                    <View style={{height:'100%',width:"50%",alignItems:'center',justifyContent:"space-around",borderRightWidth:1,borderRightColor:"white"}}>
                      <Text style={{fontSize:18,color:'white',fontWeight:"bold"}}>Dose 1</Text>
                      <Text style={{fontSize:15,color:'white'}}>{item?.available_capacity_dose1}</Text>
                    </View>
                    <View style={{height:'100%',width:"50%",alignItems:'center',justifyContent:"space-around"}}>
                      <Text style={{fontSize:18,color:'white',fontWeight:"bold",justifyContent:"center"}}>Dose 2</Text>
                      <Text style={{fontSize:15,color:'white',justifyContent:"center"}}>{item?.available_capacity_dose2}</Text>
                    </View>
                  </View>
                </BlurView>
              </View>
            </View>
            <View style={{height:'40%',width:"100%",backgroundColor:'transparent',padding:5}}>
              <View style={{height:'100%',width:"100%",alignItems:'center',flexDirection:'column',justifyContent:'space-around' ,backgroundColor:'transparent',borderRadius:6}}>
                <BlurView style={{height:'100%',width:"100%",alignItems:'center',justifyContent:"center",borderRadius:6}}>
                  <View style={{height:'15%',width:"100%",alignItems:'center',justifyContent:"center"}}>
                    <Text style={{fontSize:18,color:'white',fontWeight:"bold"}}>Slots Available</Text>
                  </View>
                  <View style={{height:'85%',width:"100%",alignItems:'center',flexDirection:'column',padding:5}}>
                    {item?.slots.map((data,index)=>
                      <LinearGradient key={index} start={{ x: 0, y: 0 }} end={{x: 1, y: 0 }} colors={[ '#40E0D0', '#FF8C00', '#FF0080' ]} style={{height:"24%",width:"100%",borderRadius:15,alignItems:'center',justifyContent:'center',margin:1}}>
                        <BlurView style={{height:"100%",width:"100%",borderRadius:15,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:15,color:'white'}}>{data}</Text>
                        </BlurView>
                      </LinearGradient>
                      )}
                  </View>
                </BlurView>
              </View>
            </View>
          </View>

          <BlurView style={{height:'21%',width:"100%" ,borderBottomEndRadius:10,borderBottomStartRadius:10,flexDirection:'column',padding:5}}>
              <View style={{height:'30%',width:"100%", flexDirection:'row', }}>
                  <View style={{width:"10%" ,height:'100%',alignItems:'center',justifyContent:'center'}}>
                      <FontAwesome5 name="hospital-symbol" size={20} color="black" />
                  </View>
                  <View style={{width:"90%" ,height:'100%',justifyContent:'center'}}>
                      <Text style={{fontSize:13,color:'black',fontWeight:"bold"}}>{rawHospitaldata?.centers?.name}</Text>
                  </View>
              </View>
              <View style={{height:'70%',width:"100%", flexDirection:'row', }}>
                  <View style={{width:"10%" ,height:'100%',alignItems:'center',justifyContent:'center'}}>
                  <Entypo name="location-pin" size={26} color="black" />
                  </View>
                  <View style={{width:"90%" ,height:'100%',flexDirection:'column',justifyContent:'center'}}>
                      <Text style={{fontSize:13,color:'black',fontWeight:"bold"}}>{rawHospitaldata?.centers?.address},</Text>
                      <Text style={{fontSize:13,color:'black',fontWeight:"bold"}}>{rawHospitaldata?.centers?.district_name},</Text>
                      <Text style={{fontSize:13,color:'black',fontWeight:"bold"}}>{rawHospitaldata?.centers?.state_name},</Text>
                      <Text style={{fontSize:13,color:'black',fontWeight:"bold"}}>{rawHospitaldata?.centers?.pincode}</Text>
                  </View>
              </View>
          </BlurView>
          {/* <View style={{alignItems:'center',top:5}}>
          <View style={{  borderBottomColor: 'black',  borderBottomWidth: 1,width:"85%"}}/>
          </View> */}
          {/* <View style={{height:"8%",alignItems:'center',padding:3}}>
            <BlurView style={{height:"100%",alignItems:'center',padding:3,borderRadius:6}}>
              <View style={{height:"100%",alignItems:'center',padding:3,backgroundColor:"#4c75f2",borderRadius:6,justifyContent:'center'}}>
              <Text style={{fontSize:15,color:'white',fontWeight:"bold"}}>{item.vaccine}</Text>
              </View>
            </BlurView>
          </View> */}
          
        </LinearGradient>
      );
    }
    //rawHospitaldata?.centers?.vaccine_fees[0]?.fee           {monthNames[d.getMonth()]} {d.getFullYear()}, {dayNames[d.getDay()]}
    return (
        <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: '#161625', width: "100%",height:'100%'}}>
          
            <ImageBackground resizeMode="cover" source={covidpic} blurRadius={2.8} style={{ width: "100%",height:'100%'}}>
            <View style={{alignItems: 'center'}}>
                <View style={styles.titlecontainer}>  
                    <Text style={styles.primarytitle}>VACCINE</Text>
                    <Text style={styles.secondarytitle}>TRACKER</Text>
                </View>
            </View>
            <View>
              <Carousel
                data={hospital}
                renderItem={_renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                containerCustomStyle={styles.carouselContainer}
                inactiveSlideShift={0}
                scrollInterpolator={scrollInterpolator}
                slideInterpolatedStyle={animatedStyles}
                useScrollView={true} 
                layout={'default'}      
              /> 
            </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    carouselContainer: {
      marginTop: 5
    },
    itemContainer: {
      width: 305,
      height: 620,
      backgroundColor: 'dodgerblue',
      borderRadius:10,
      flexDirection:'column',
      justifyContent:'space-between'
    },
    itemLabel: {
      color: 'white',
      fontSize: 24
    },
    counter: {
      marginTop: 25,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    titlecontainer:{
        flexDirection:'row',
        margin: 5
    },
    primarytitle:{
         color:'#bdbdbd',
         textAlign:'center',
         fontSize: 30,
         fontWeight:'bold'
    },
    secondarytitle:{
         color: '#4c75f2',
         textAlign:'center',
         fontSize: 30,
         fontWeight:'bold'
    },
    titlecontainer:{
      flexDirection:'row',
      margin: 5
  },
  primarytitle:{
       color:'#bdbdbd',
       textAlign:'center',
       fontSize: 30,
       fontWeight:'bold'
  },
  secondarytitle:{
       color: '#4c75f2',
       textAlign:'center',
       fontSize: 30,
       fontWeight:'bold'
  }
  });