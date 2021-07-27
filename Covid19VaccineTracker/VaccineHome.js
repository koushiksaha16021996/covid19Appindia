import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/core';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity, ScrollView, Text, View ,StyleSheet, Platform, ImageBackground,Dimensions} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context';
import { Provider} from  'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import state from '../states.json'
import s1 from '../statewisedata/1.json'
import covidpic from '../image/covidpic.jpg'
import hospital from '../image/hospital.png'
import { BlurView } from 'expo-blur';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json

import { scrollInterpolator, animatedStyles } from '../utils/animations';

const SLIDER_WIDTH = Dimensions.get('window').width+60;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
export default function VaccineHome(props) {
    const insets = useSafeArea();
    const isfocused= useIsFocused()
    const [totalcase,settotalcase]=useState([])
    const [Username, setUsername] = useState("");
    const [dis, setdis] = useState("");
    const [States,setstates]= useState(state)
    const [state1,setstate1]= useState(s1)
    const [dates,setdates] = useState("")
    const [disvaccine,setdisvaccine] = useState([])
    useEffect(()=>{
      setUsername("")
      setdis("")
      setdates("")
      setdisvaccine([])
      settotalcase([])
    },[!isfocused])
     useEffect(()=>{   
      axios.get("https://api.covid19india.org/v4/min/data.min.json").then(res=>{
        const sdata=Object.entries(res.data)
        const total=sdata.find(item=>item?.[0]=="TT")
        settotalcase(total)
      })
      let d=new Date()
      console.log(typeof(d.getDate()))
      let newdate=""
      if((d.getDate().toString()).length==2){
        newdate+=d.getDate()+"-"
      }
      else{
        newdate+="0"+d.getDate()+"-"
      }
      if((d.getMonth()+1).length==2){
        newdate+=d.getMonth()+1+"-"
      }
      else{
        newdate+="0"+(d.getMonth()+1)+"-"
      }
      newdate+=d.getFullYear()
      setdates(newdate)
      console.log(newdate)
    },[isfocused])
    useEffect(()=>{
      dis ? axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${dis}&date=${dates}`)
      .then(res=>{
        //console.log(res.data)
        // setdisvaccine(res.data)
        const d=(Object.entries(res.data))
        const d1=d[0][1]
        console.log(typeof(d1))
        setdisvaccine(d1)
      }): console.log("not seletced")
    },[dis])
    console.log(Object.entries(disvaccine))
    const visitHospital=(cId)=>{
      props.navigation.navigate("VisitHospital",{
        centerId:cId,
        date:dates
      })
      
    }
    const _renderItem=({ item ,index})=> {
      return (
        <TouchableOpacity style={styles.itemContainer} activeOpacity={1.0} onPress={()=>visitHospital(item?.center_id)}>
          {index % 2 ==0 ? <BlurView style={{height:"100%",width:"100%",alignItems: 'center',backgroundColor: 'transparent',borderRadius:10,justifyContent:'space-between'}}>
            <View style={{width:'100%',height:'70%'}}>
              <ImageBackground resizeMode="contain" source={hospital} style={{width:"100%",height:"100%",flexDirection:'column',justifyContent:'space-between'}}>
                <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row',backgroundColor:"#28a745",padding:3,borderRadius:6}}>
                    <Text style={{fontSize:15,color:'white',fontWeight:"bold"}}>Starts:-</Text>
                    <Text style={{fontSize:15,color:'white',fontWeight:"bold"}}>{item?.from}</Text>
                  </View>
                  {item?.fee_type=="Paid" ?<View style={{backgroundColor:"red",padding:3,borderRadius:6}}>
                    <Text style={{fontSize:15,color:'white',fontWeight:"bold"}}>{item?.fee_type}</Text>
                  </View>: <View style={{backgroundColor:"#4c75f2",padding:3,borderRadius:6}}>
                    <Text style={{fontSize:15,color:'white',fontWeight:"bold"}}>{item?.fee_type}</Text>
                  </View>}
                </View>
                <View style={{width:"100%",alignItems:"center",justifyContent:'center',}}>
                  <Text style={{padding:1,backgroundColor:"#2e1e30",borderRadius:4,color:'#db5581'}}>
                    Click here to view the details.... 
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{backgroundColor:'transparent',width:'100%',height:'30%',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
              <BlurView style={{width:'100%',height:'100%',borderBottomLeftRadius:10,borderBottomRightRadius:10,padding:5,justifyContent:"center"}}>
                <View style={{alignItems: 'center',width:'100%'}}>
                 <Text style={{fontSize:15,color:'white',fontWeight:"bold"}}>{item.name}</Text>
                </View>
              </BlurView>
            </View>
          </BlurView>
          :
          <BlurView style={{height:"100%",width:"100%",alignItems: 'center',backgroundColor: 'transparent',borderRadius:10,justifyContent:'space-between'}}>
            <View style={{width:'100%',height:'70%'}}>
              <ImageBackground resizeMode="contain" source={hospital} style={{width:"100%",height:"100%",flexDirection:'column',justifyContent:'space-between'}}>
                <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row',backgroundColor:"#28a745",padding:3,borderRadius:6}}>
                    <Text style={{fontSize:15,color:'white',fontWeight:"bold"}}>Starts:-</Text>
                    <Text style={{fontSize:15,color:'white',fontWeight:"bold"}}>{item?.from}</Text>
                  </View>
                  {item?.fee_type=="Paid" ?<View style={{backgroundColor:"red",padding:3,borderRadius:6}}>
                    <Text style={{fontSize:15,color:'white',fontWeight:"bold"}}>{item?.fee_type}</Text>
                  </View>: <View style={{backgroundColor:"#4c75f2",padding:3,borderRadius:6}}>
                    <Text style={{fontSize:15,color:'white',fontWeight:"bold"}}>{item?.fee_type}</Text>
                  </View>}
                </View>
                <View style={{width:"100%",alignItems:"center",justifyContent:'center',}}>
                  <Text style={{padding:1,backgroundColor:"#2e1e30",borderRadius:4,color:'#db5581'}}>
                    Click here to view the details.... 
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{backgroundColor:'#161625',width:'100%',height:'30%',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
              <BlurView style={{width:'100%',height:'100%',borderBottomLeftRadius:10,borderBottomRightRadius:10,padding:5,justifyContent:"center"}}>
                <View style={{alignItems: 'center',width:'100%'}}>
                 <Text style={{fontSize:15,color:'white',fontWeight:"bold"}}>{item.name}</Text>
                </View>
              </BlurView>
            </View>
          </BlurView>
          }
        </TouchableOpacity>
      );
    }
    
  
    return (
      <Provider>
        <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: '#161625', width: "100%",height:'100%'}}>
          <ImageBackground resizeMode="cover" source={covidpic} blurRadius={2.8} style={{ width: "100%",height:'100%'}}>
            
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{alignItems: 'center'}}>
                <View style={styles.titlecontainer}>  
                    <Text style={styles.primarytitle}>VACCINE</Text>
                    <Text style={styles.secondarytitle}>TRACKER</Text>
                </View>
            </View>
            <View style={styles.cardcontainer}>
              
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{}}>
                <BlurView blurType="light" blurAmount={20} style={{height:"90%",width:300, backgroundColor:'transparent',marginStart:20,marginEnd:10,marginTop:5,alignItems:'center',justifyContent:'center',borderRadius:10}}>
                  <View  style={{width:'100%',height:"100%",alignItems:'center',borderRadius:10,}}>
                    <Text style={{color:'#bdbdbd',fontSize:25,fontWeight: "bold"}}>Total Vaccinated</Text>
                    <Text style={{color:'#bdbdbd',fontSize:25,fontWeight: "bold"}}>{totalcase[1]?.total?.vaccinated1+totalcase[1]?.total?.vaccinated2}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%',marginTop:4}}>
                      <View style={{flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                        <Text style={{color:'#bdbdbd',fontSize:18,fontWeight: "bold"}}>Dose 1</Text>
                        <Text style={{color:'#bdbdbd',fontSize:18,fontWeight: "bold"}}>{totalcase[1]?.total?.vaccinated1}</Text>
                      </View>
                      <View style={{flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                        <Text style={{color:'#bdbdbd',fontSize:18,fontWeight: "bold"}}>Dose 2</Text>
                        <Text style={{color:'#bdbdbd',fontSize:18,fontWeight: "bold"}}>{totalcase[1]?.total?.vaccinated2}</Text>
                      </View>
                    </View>
                  </View>
                </BlurView  >
                <BlurView blurType="light" blurAmount={20} style={{height:"90%",width:300, backgroundColor:'transparent',marginStart:20,marginEnd:10,marginTop:5,alignItems:'center',justifyContent:'center',borderRadius:10}}>
                  <View  style={{width:'100%',height:"100%",alignItems:'center',borderRadius:10,backgroundColor:'transparent'}}>
                    
                    <Text style={{color:'#ff073a',fontSize:25,fontWeight: "bold"}}>Total Covid Case</Text>
                    <Text style={{color:'#ff073a',fontSize:25,fontWeight: "bold"}}>{totalcase[1]?.total?.confirmed}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%',marginTop:4}}>
                      <View style={{flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                        <Text style={{color:'#ff073a',fontSize:18,fontWeight: "bold"}}>Confirmed</Text>
                        <Text style={{color:'#ff073a',fontSize:18,fontWeight: "bold"}}>{totalcase[1]?.delta?.confirmed}</Text>
                      </View>
                      <View style={{flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                        <Text style={{color:'lightgreen',fontSize:18,fontWeight: "bold"}}>Recovered</Text>
                        <Text style={{color:'lightgreen',fontSize:18,fontWeight: "bold"}}>{totalcase[1]?.delta?.recovered}</Text>
                      </View>
                      <View style={{flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                        <Text style={{color:'#bdbdbd',fontSize:18,fontWeight: "bold"}}>Deased</Text>
                        <Text style={{color:'#bdbdbd',fontSize:18,fontWeight: "bold"}}>{totalcase[1]?.delta?.deceased}</Text>
                      </View>
                    </View>
                  </View>
                </BlurView>
              </ScrollView>
            </View>

            <View style={{padding:1,width:"100%",alignItems:'center',justifyContent:"center"}}>
                <BlurView blurType="light" blurAmount={20} style={{alignItems:'center',justifyContent:"center",padding:3,borderRadius:10}}>
                  <View style={{alignItems:'center',padding:6,backgroundColor:'#4c75f2',borderRadius:10}}>
                    <Text style={{fontSize:20,color:'white',fontWeight:"bold"}}>Search by District</Text>
                  </View>
                </BlurView>
            </View>

            <View style={{padding:5,width:"100%",alignItems:'center',justifyContent:"center"}}>
            <BlurView blurType="light" blurAmount={20} style={{width:"100%",alignItems:'center',justifyContent:"center",padding:4,borderRadius:10}}>
              <View style={{flexDirection:'row' , alignItems:'center' ,justifyContent:'space-between',width:"100%"}}>
              <View style={{backgroundColor:'#28a745',width:"48%",borderRadius:10}}>
                  <Picker
                    selectedValue={Username}
                    style={{ height: 50, width: "100%" ,color:'white'}}
                    onValueChange={(itemValue, itemIndex) => setUsername(itemValue)}
                  >
                    <Picker.Item label="Select State" value={Username} />
                    {States?.states.map((item,index)=><Picker.Item key={index} label={item?.state_name} value={item?.state_id} />)}

                  </Picker>
                </View>
                <View style={{backgroundColor:'#28a745',width:"48%",borderRadius:10}}>
                {Username ?<Picker
                  selectedValue={dis}
                  style={{ height: 50, width: "100%" ,color:'white'}}
                  onValueChange={(itemValue, itemIndex) => setdis(itemValue)}
                >
                  <Picker.Item label="Select District"  />
                  {state1[Username].map((item,index)=><Picker.Item key={index} label={item?.district_name} value={item?.district_id} />)}
                </Picker> : null}
                </View>
              </View>
            </BlurView>
            </View>
            {/* <View style={styles.blurcontainer}>
              <BlurView blurType="light" blurAmount={20} style={styles.blur}>
                <Text style={{color:'white',fontSize:20}}>vaccine tracker</Text>
              </BlurView>
            </View> */}
            {/* <View style={{alignItems: 'center',justifyContent: 'center',width:200,height:50}}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{x: 1, y: 1 }}
                colors={[ 'red', 'yellow', 'green' ]}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',0
                  borderRadius: 20,
                  width: "100%",
                  height:'100%',
                  padding:4
                }}
              >
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.signUpButton}
                >
                  <Text>Sign Up</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View> */}
            <View>
        {dis? <Carousel
          data={disvaccine}
          renderItem={_renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true} 
          layout={'default'}      
        />:null}
        
      </View>
           
          </ScrollView>
            
          </ImageBackground>  
        </View>
      </Provider>        
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center",
        backgroundColor:'white'
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
    cardcontainer:{
      backgroundColor:"transparent",
      width:"100%",
      height:155,
      justifyContent:'center',
    },
    signUpButton: {
      width: "100%",
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      height:'100%'
    },
    blurcontainer:{
      height:300,
      width:"100%",
      justifyContent:'center',
      alignItems:"center"
    },
    blur:{
      height:"100%",
      width:"50%",

    },
    carouselContainer: {
      margin: 2
    },
    itemContainer: {
      width: 300,
      height: 350,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderRadius:10
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
    }
})
//#395faa
//#85506a