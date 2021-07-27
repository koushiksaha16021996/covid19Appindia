import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useIsFocused } from '@react-navigation/core';
import { useSafeArea } from 'react-native-safe-area-context';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart } from 'react-native-chart-kit';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TrackerHome(props) {
    const pad=25
    const insets = useSafeArea();
    const [flag,setflag]=useState(true)
    const [statesname, setstatesname]=useState([
        {
            stateID: "AN",
            stateName: "Andaman and Nicobar Islands"
        },
        {
            stateID: "AP",
            stateName: "Andhra Pradesh"
        },
        {
            stateID: "AR",
            stateName: "Arunachal Pradesh"
        },
        {
            stateID: "AS",
            stateName: "Assam "
        },
        {
            stateID: "BR",
            stateName: "Bihar"
        },
        {
            stateID: "CH",
            stateName: "Chandigarh"
        },
        {
            stateID: "CT",
            stateName: "Chattisgarh"
        },
        {
            stateID: "DL",
            stateName: "Delhi"
        },
        {
            stateID: "DN",
            stateName: "Dadra and Nagar Haveli"
        },
        {
            stateID: "GA",
            stateName: "Goa"
        },
        {
            stateID: "GJ",
            stateName: "Gujarat"
        },
        {
            stateID: "HP",
            stateName: "Himachal Pradesh "
        },
        {
            stateID: "HR",
            stateName: "Haryana"
        },
        {
            stateID: "JH",
            stateName: "Jharkhand"
        },
        {
            stateID: "JK",
            stateName: "Jammu and Kashmir"
        },
        {
            stateID: "KA",
            stateName: "Karnataka"
        },
        {
            stateID: "KL",
            stateName: "Kerala"
        },
        {
            stateID: "LA",
            stateName: "Ladakh"
        },
        {
            stateID: "LD",
            stateName: "Lakshadweep Islands"
        },
        {
            stateID: "MH",
            stateName: "Maharashtra"
        },
        {
            stateID: "ML",
            stateName: "Maharashtra"
        },
        {
            stateID: "MN",
            stateName: "Manipur"
        },
        {
            stateID: "MP",
            stateName: "Madhya Pradesh"
        },
        {
            stateID: "MZ",
            stateName: "Mizoram"
        },
        {
            stateID: "NL",
            stateName: "Nagaland"
        },
        {
            stateID: "OR",
            stateName: "Odisha"
        },
        {
            stateID: "PB",
            stateName: "Punjab"
        },
        {
            stateID: "PY",
            stateName: "Pondicherry"
        },
        {
            stateID: "RJ",
            stateName: "Rajasthan"
        },
        {
            stateID: "SK",
            stateName: "Sikkim"
        },
        {
            stateID: "TG",
            stateName: "Telangana"
        },
        {
            stateID: "TN",
            stateName: "Tamil Nadu "
        },
        {
            stateID: "TR",
            stateName: "Tripura"
        },
        {
            stateID: "UP",
            stateName: "Uttar Pradesh "
        },
        {
            stateID: "UT",
            stateName: "Uttarakhand"
        },
        {
            stateID: "WB",
            stateName: "West Bengal"
        },
    ])
    let param=new URLSearchParams();
    const isfocused= useIsFocused()
    const [data,setdata]= useState([])
    const [refineddata,setrefineddata]= useState([])
    const [totalcase,settotalcase]= useState([])
    const [coviddata,setcoviddata] = useState([])
    const [coviddataforgraph,setcoviddataforgraph] = useState([])
    const [time,settime] = useState({
        Time:[]
    })
    const [confirmcasess,setconfirmcase] = useState({
        Confirmcasess:[]
    })
    const [activecasess,setactivecase] = useState({
        Activecasess:[]
    })
    const [recovercasess,setrecovercase] = useState({
        Recovercasess:[]
    })
    const [deathcasess,setdeathcase] = useState({
        Deathcasess:[]
    })
    
    useEffect(()=>{
        
      axios.get("https://api.covid19india.org/v4/min/data.min.json").then(res=>{
        const sdata=Object.entries(res.data).sort(function(a, b){return  b?.[1]?.total?.confirmed - a?.[1]?.total?.confirmed })
        setdata(sdata)
        //console.log(sdata)
        //console.log(Object.entries(sdata?.[1]?.[1]?.districts))
      })
       setflag(false)
       //AsyncStorage.clear()
    //    AsyncStorage.getItem("view").then(data=>{
    //        console.warn(data)
    //    })
       AsyncStorage.getItem("view").then(data=>{
           if(data==null){
            param.append("open", "true")
            axios.post("https://us-central1-vitaltracker-native-serv-7f2d5.cloudfunctions.net/app/viewed" , param,{
              headers:{
              'content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(res=>{
              AsyncStorage.setItem("view","done")
            })
           }
       })
    },[isfocused])
    useEffect(()=>{
        const newdata=data.filter(item=>item?.[0]!="TT")
        setrefineddata(newdata)
        const total=data.find(item=>item?.[0]=="TT")
        settotalcase(total)
    },[data])
    useEffect(()=>{
        axios.get("https://api.covid19india.org/v4/min/timeseries.min.json").then(res=>{
            
            const data=Object.entries(res.data)
            const totdata=data.find(item=>item?.[0]=="TT")
            setcoviddata(Object.entries(totdata?.[1]?.dates))
        })
        
    },[isfocused])
    useEffect(()=>{
        coviddata.reverse().length=7
        setcoviddataforgraph(coviddata.reverse())
    },[coviddata])
    
    useEffect(()=>{
        let tt=[]
        let cc=[]
        let ac=[]
        let rc=[]
        let dc=[]
        coviddataforgraph.map(item=>{
            tt.push(item?.[0])
            cc.push(item?.[1]?.delta?.confirmed)
            ac.push(activecases(item?.[1]?.delta?.confirmed , item?.[1]?.delta?.recovered , item?.[1]?.delta?.deceased , item?.[1]?.delta?.other))
            rc.push(item?.[1]?.delta?.recovered)
            dc.push(item?.[1]?.delta?.deceased)
            
            settime({
                Time:tt
            })
            setconfirmcase({
                Confirmcasess:cc
            })
            setactivecase({
                Activecasess:ac
            })
            setrecovercase({
                Recovercasess:rc
            })
            setdeathcase({
                Deathcasess:dc
            })
        })
    },[coviddataforgraph])
    //console.log(data.AN.delta7.confirmed)
    // console.log(data[0]?.[0])
    // console.log(data)
    // console.log(refineddata)
    //console.log(totalcase)
    //console.log(coviddataforgraph)
    const fetchname=(statename)=>{
        const stName=statesname.find(item=>item?.stateID==statename)
        return stName.stateName
    }
    
    const parentactivecase=(c,r,d,o)=>{
        if(c && r && d && o ){
            if (c-r-d-o >0){
                return <Text style={{color: '#007bff94' , fontSize:10 , fontWeight:"bold"}}>+{c-r-d-o}</Text>
            }
            else{
                return <Text style={{color: '#007bff94' , fontSize:10 , fontWeight:"bold"}}>{c-r-d-o}</Text>
            }
        }
        else if(c && r && d){
            if (c-r-d >0){
               return <Text style={{color: '#007bff94' , fontSize:10 , fontWeight:"bold"}}>+{c-r-d}</Text>
            }
            else{
                return <Text style={{color: '#007bff94' , fontSize:10 , fontWeight:"bold"}}>{c-r-d}</Text>
            }
        }
        else if(c && r && o){
            if (c-r-o >0){
                return <Text style={{color: '#007bff94' , fontSize:10 , fontWeight:"bold"}}>+{c-r-o}</Text>
            }
            else{
                return <Text style={{color: '#007bff94' , fontSize:10 , fontWeight:"bold"}}>{c-r-o}</Text>
            }
        }
        else if(c && r){
            if (c-r >0){
                return <Text style={{color: '#007bff94' , fontSize:10 , fontWeight:"bold"}}>+{c-r}</Text>
            }
            else{
                return <Text style={{color: '#007bff94' , fontSize:10 , fontWeight:"bold"}}>{c-r}</Text>
            }
        }
        else if(c && d){
            if (c-d >0){
                return <Text style={{color: '#007bff94' , fontSize:10 , fontWeight:"bold"}}>+{c-d}</Text>
            }
            else{
                return <Text style={{color: '#007bff94' , fontSize:10 , fontWeight:"bold"}}>{c-d}</Text>
            }
        }
        else if(c){
            if (c>0){
                return <Text style={{color: '#007bff94' , fontSize:10 , fontWeight:"bold"}}>+{c}</Text>
            }
            else{
                return <Text style={{color: '#007bff94' , fontSize:10 , fontWeight:"bold"}}>{c}</Text>
            }
        }
        else{
            return <Text style={{color: '#007bff94' , fontSize:10 , fontWeight:"bold"}}></Text>
        }
    }
    

    const activecase=(c,r,d,o)=>{
        if(c && r && d && o ){
            if (c-r-d-o >0){
                return <Text style={{color:'#007bff'}}>+{c-r-d-o}</Text>
            }
            else{
                return <Text style={{color:'#007bff'}}>{c-r-d-o}</Text>
            }
        }
        else if(c && r && d){
            if (c-r-d >0){
               return <Text style={{color:'#007bff'}}>+{c-r-d}</Text>
            }
            else{
                return <Text style={{color:'#007bff'}}>{c-r-d}</Text>
            }
        }
        else if(c && r && o){
            if (c-r-o >0){
                return <Text style={{color:'#007bff'}}>+{c-r-o}</Text>
            }
            else{
                return <Text style={{color:'#007bff'}}>{c-r-o}</Text>
            }
        }
        else if(c && r){
            if (c-r >0){
                return <Text style={{color:'#007bff'}}>+{c-r}</Text>
            }
            else{
                return <Text style={{color:'#007bff'}}>{c-r}</Text>
            }
        }
        else if(c && d){
            if (c-d >0){
                return <Text style={{color:'#007bff'}}>+{c-d}</Text>
            }
            else{
                return <Text style={{color:'#007bff'}}>{c-d}</Text>
            }
        }
        else if(c){
            if (c>0){
                return <Text style={{color:'#007bff'}}>+{c}</Text>
            }
            else{
                return <Text style={{color:'#007bff'}}>{c}</Text>
            }
        }
        else{
            return <Text style={{color:'#007bff'}}></Text>
        }
    }
    const activecases=(c,r,d,o)=>{
        if(c && r && d && o ){
            return c-r-d-o
        }
        else if(c && r && d){
            return c-r-d
        }
        else if(c && r && o){
            return c-r-o
        }
        else if(c && r){
            return c-r
        }
        else if(c){
            return c
        }
        else{
            return 0
        }
    }
    
    const confirmcase=(c)=>{
        if(c){
            return <Text style={{color:'#ff073a'}}>+{c}</Text>
        }
        else{
            return <Text style={{color:'#ff073a'}}></Text>
        }
    }
    const recovercase=(r)=>{
        
        if(r){
            if(r>0){
                return <Text style={{color:'#28a745'}}>+{r}</Text>
            }
            else{
                return <Text style={{color:'#28a745'}}>-{r}</Text>
            }
        }
        else{
            return <Text style={{color:'#28a745'}}></Text>
        }
    }
    const decesedcase=(d)=>{
         
        if(d){
            if(d>0){
                return <Text style={{color:'#6b747c'}}>+{d}</Text>
            }
            else{
                return <Text style={{color:'#6b747c'}}>-{d}</Text>
            }
        }
        else{
            return <Text style={{color:'#6b747c'}}></Text>
        }
    }
    const details=(stateName , statecode , stateDetails)=>{
        
        props.navigation.navigate("Statewisedata", {
            statename: stateName,
            stated: JSON.stringify(stateDetails),
            stcode : statecode
        })
    }
    const fstvaccinetext=(p,v1)=>{
        const n=(v1*(100/p)).toFixed(1)
           if(n<=49) {
            return <View style={{paddingStart:`${n}%`}}>
            <Text style={{color:"#bdbdbd"}}>At least one dose({n}%)</Text>
            <Text style={{color:"#bdbdbd"}}>|</Text>
            </View>
           }
           else{
            return <View>
            <Text style={{color:"#bdbdbd",paddingStart:"49%"}}>At least one dose({n}%)</Text>
            <Text style={{color:"#bdbdbd",paddingStart:`${n-1}%`,fontWeight:'bold'}}>|</Text>
            </View>
           }
                         
    }
    const secvaccinetext=(p,v2)=>{
        const n=(v2*(100/p)).toFixed(1)
        if(n<=59) {
         return <View style={{paddingStart:`${n}%`}}>
        <Text style={{color:"#bdbdbd"}}>|</Text>   
         <Text style={{color:"#bdbdbd"}}>Fully vaccinated({n}%)</Text>
         </View>
        }
        else{
         return <View>
         <Text style={{color:"#bdbdbd",paddingStart:`${n-1}%`,fontWeight:'bold'}}>|</Text>
         <Text style={{color:"#bdbdbd",paddingStart:"59%"}}>Fully vaccinated({n}%)</Text>
         </View>
        }
    }
    const graphdata=(p,v1,v2)=>{
        const g1=(v1*(100/p)).toFixed(1)
        const g2=(v2*(100/p)).toFixed(1)
        return <View style={{width:"100%",height:25}}>
                   <View style={{width:"100%",height:"100%",backgroundColor:'#2e1e30',borderRadius:4}}>
                       <View style={{width:`${g1}%`,height:"100%",backgroundColor:'#6e334e',borderRadius:4}}>
                           <View style={{width:Dimensions.get('window').width,height:"100%"}}>
                               <View style={{width:"100%",height:"100%"}}>
                                   <View style={{width:`${g2}%`,height:"100%", backgroundColor:'#b1486d',borderRadius:4}}>
                                   </View>
                               </View>
                           </View>
                       </View>
                   </View>
               </View>
    }
 //console.log(totalcase?.[1]?.meta?.population)
    return (
        <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: '#161625', width: "100%",height:'100%'}}>
            {!flag  ? <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{alignItems: 'center'}}>
                    <View style={style.titlecontainer}>  
                        <Text style={style.primarytitle}>COVID19</Text>
                        <Text style={style.secondarytitle}>INDIA</Text>
                    </View>
                </View>
                <View style={style.indigatorcard}>
                    <View style={style.confirmcard}>
                        <Text style={style.confirmtextstyle}>Confirmed</Text>
                        <Text style={{color: '#ae0c33' , fontSize:10, fontWeight:"bold"}}>+{totalcase?.[1]?.delta?.confirmed || 0}</Text>
                        <Text style={{color: '#ff073a' , fontSize:15 , fontWeight:"bold"}}>{totalcase?.[1]?.total?.confirmed || 0}</Text>
                    </View>
                    <View style={style.activecard}>
                        <Text style={style.activetextstyle}>Active</Text>
                        {parentactivecase(totalcase?.[1]?.delta?.confirmed,totalcase?.[1]?.delta?.recovered,totalcase?.[1]?.delta?.deceased,totalcase?.[1]?.delta?.other)}
                        <Text style={{color: '#007bff' , fontSize:15 , fontWeight:"bold"}}>{activecases(totalcase?.[1]?.total?.confirmed,totalcase?.[1]?.total?.recovered,totalcase?.[1]?.total?.deceased,totalcase?.[1]?.total?.other)}</Text>
                    </View>
                    <View style={style.recovercard}>
                        <Text style={style.recovertextstyle}>Recovered</Text>
                        <Text style={{color: '#237a3c' , fontSize:10, fontWeight:"bold"}}>+{totalcase?.[1]?.delta?.recovered || 0}</Text>
                        <Text style={{color: '#28a745' , fontSize:15 , fontWeight:"bold"}}>{totalcase?.[1]?.total?.recovered || 0}</Text>
                    </View>
                    <View style={style.decesedcard}>
                        <Text style={style.decesedtextstyle}>Decesed</Text>
                        <Text style={{color: '#4d525d' , fontSize:10, fontWeight:"bold"}}>+{totalcase?.[1]?.delta?.deceased || 0}</Text>
                        <Text style={{color: '#6b747c' , fontSize:15 , fontWeight:"bold"}}>{totalcase?.[1]?.total?.deceased || 0}</Text>
                    </View>
                </View>
                <View  style={style.vaccinecontainer}>
                    <View style={style.vaccinesubcontainer}>
                        <Ionicons name="shield-checkmark-sharp" size={18} color="#db5581" />
                        <Text style={style.vaccinetextstyle}>{totalcase?.[1]?.total?.vaccinated1 + totalcase?.[1]?.total?.vaccinated2 || 0} vaccine doses administered</Text>
                    </View>
                </View>
                <View style={{marginTop:4}}>
                    
                        <View style={{width:Dimensions.get('window').width-15,flexDirection:'column',paddingLeft:10,paddingEnd:10}}>
                            {fstvaccinetext(totalcase?.[1]?.meta?.population,totalcase?.[1]?.total?.vaccinated1)}
                            {graphdata(totalcase?.[1]?.meta?.population , totalcase?.[1]?.total?.vaccinated1 , totalcase?.[1]?.total?.vaccinated2)}
                            {secvaccinetext(totalcase?.[1]?.meta?.population,totalcase?.[1]?.total?.vaccinated2)}
                        </View>
                    
                </View>
                {/* <Text style={{color: 'white'}} onPress={()=>nxt()}>next page</Text> */}

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:Dimensions.get('window').width,marginTop:10}}>
                    
                    <View style={{flexDirection:'column'}}>
                        <View style={style.eachheaddingrow} >
                           <View style={style.headdingstatecell}>
                               <Text style={style.headdingstatecelltext}>States</Text>
                           </View>
                           <View style={style.nrmlcell}>
                               <Text style={style.nrmlcelltext}>Confirm</Text>
                           </View>
                           <View style={style.nrmlcell}>
                               <Text style={style.nrmlcelltext}>Active</Text>
                           </View>
                           <View style={style.nrmlcell}>
                               <Text style={style.nrmlcelltext}>Recovered</Text>
                           </View>
                           <View style={style.nrmlcell}>
                               <Text style={style.nrmlcelltext}>Deceased</Text>
                           </View>
                           <View style={style.nrmlcell}>
                               <Text style={style.nrmlcelltext}>Population</Text>
                           </View>
                           <View style={style.nrmlcell}>
                               <Text style={style.nrmlcelltext}>Tested</Text>
                           </View>
                           <View style={style.nrmlcell}>
                               <Text style={style.nrmlcelltext}>Test Per Lakh</Text>
                           </View>
                           <View style={style.nrmlcell}>
                               <Text style={style.nrmlcelltext}>Vaccinated1</Text>
                           </View>
                           <View style={style.nrmlcell}>
                               <Text style={style.nrmlcelltext}>Vaccinated2</Text>
                           </View>
                           <View style={style.nrmlcell}>
                               <Text style={style.nrmlcelltext}>Vaccinated/lakh</Text>
                           </View>
                        </View>
                        {flag ? 
                            <View><Text style={{color:"white"}}>hi</Text></View> 
                            : 
                            refineddata.map((item,index)=>
                                <View style={style.eachheaddingrow} key={index}>
                                <View style={style.statecell}>
                                    <Text  style={style.statecelltext}>{fetchname(item?.[0])}</Text>
                                    <View>
                                        <Text style={{color:'#db5581',width: '100%'}} onPress={()=>details(fetchname(item?.[0]),item?.[0],item?.[1])}>details here</Text>
                                    </View>
                                </View>
                                <View style={style.cell}>
                                    <View>
                                        {confirmcase(item?.[1]?.delta?.confirmed)}
                                    </View>
                                    <Text style={style.celltext}>{item?.[1]?.total?.confirmed || 0}</Text>
                                </View>
                                <View style={style.cell}>
                                    <View>
                                        {activecase(item?.[1]?.delta?.confirmed,item?.[1]?.delta?.recovered,item?.[1]?.delta?.deceased,item?.[1]?.delta?.other)}
                                    </View>
                                    <Text style={style.celltext}>{activecases(item?.[1]?.total?.confirmed,item?.[1]?.total?.recovered,item?.[1]?.total?.deceased,item?.[1]?.total?.other)}</Text>
                                </View>
                                <View style={style.cell}>
                                    <View>
                                        {recovercase(item?.[1]?.delta?.recovered)}
                                    </View>
                                    <Text style={style.celltext}>{item?.[1]?.total?.recovered || 0}</Text>
                                </View>
                                <View style={style.cell}>
                                    <View>
                                        {decesedcase(item?.[1]?.delta?.deceased)}
                                    </View>
                                    <Text style={style.celltext}>{item?.[1]?.total?.deceased || 0}</Text>
                                </View>
                                <View style={style.cell}>
                                    <Text style={style.celltext}>{item?.[1]?.meta?.population || 0}</Text>
                                </View>
                                <View style={style.cell}>
                                    <Text style={style.celltext}>{item?.[1]?.total?.tested || 0}</Text>
                                </View>
                                <View style={style.cell}>
                                    <Text style={style.celltext}>{(100000*(item?.[1]?.total?.tested/item?.[1]?.meta?.population)).toFixed(1) || 0}</Text>
                                </View>
                                <View style={style.cell}>
                                    <Text style={style.celltext}>{item?.[1]?.total?.vaccinated1 || 0}</Text>
                                </View>
                                <View style={style.cell}>
                                    <Text style={style.celltext}>{item?.[1]?.total?.vaccinated2 || 0}</Text>
                                </View>
                                <View style={style.cell}>
                                    <Text style={style.celltext}>{(100000*((item?.[1]?.total?.vaccinated1+item?.[1]?.total?.vaccinated2)/item?.[1]?.meta?.population)).toFixed(1) || 0}</Text>
                                </View>
                                </View>
                            )
                        }    
                    </View>

                </ScrollView>
                <View style={{justifyContent:'center',marginTop: 6}}>
                    <View>
                        <Text style={{fontSize:25,textAlign:'center',color:'#6c757d',fontWeight:'bold',borderRadius:3}}>Spread Trends</Text>
                    </View>
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {confirmcasess && recovercasess && deathcasess? <View style={{flexDirection:'column' ,marginTop:18}}>
                <View style={{justifyContent:'center',width:'28%',paddingStart:10,}}>
                    <Text style={{fontSize:22,backgroundColor:'#331427',textAlign:'center',color:'#ff073a',fontWeight:'bold',borderRadius:3}}>
                    Confirmed
                    </Text>
                </View>
                
                <BarChart
                    data={{
                      labels: time.Time.reverse(),
                      datasets: [{
                        data: confirmcasess.Confirmcasess
                      }]
                    }}
                    width={Dimensions.get('window').width+200} // from react-native
                    height={220}
                    chartConfig={{
                      backgroundColor: '#331427',
                      backgroundGradientFrom: '#331427',
                      backgroundGradientTo: '#331427',
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 7, 58, ${opacity})`,
                      labelColor:(opacity = 0) => `rgba(255, 7, 58, ${opacity})`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    fromZero
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                      padding: 10
                    }}
                />
                <View style={{justifyContent:'center',width:'28%',paddingStart:10,}}>
                    <Text style={{fontSize:22,backgroundColor:'#132240',textAlign:'center',color:'#007bff',fontWeight:'bold',borderRadius:3}}>
                    Active case
                    </Text>
                </View>
                
                <BarChart
                    data={{
                      labels: time.Time.reverse(),
                      datasets: [{
                        data: activecasess.Activecasess
                      }]
                    }}
                    width={Dimensions.get('window').width+200} // from react-native
                    height={220}
                    chartConfig={{
                      backgroundColor: '#132240',
                      backgroundGradientFrom: '#132240',
                      backgroundGradientTo: '#132240',
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                      labelColor:(opacity = 0) => `rgba(0, 123, 255, ${opacity})`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    fromZero
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                      padding: 10
                    }}
                />
                <View style={{justifyContent:'center',width:'28%',paddingStart:10,}}>
                    <Text style={{fontSize:22,backgroundColor:'#182829',textAlign:'center',color:'#28a745',fontWeight:'bold',borderRadius:3}}>
                    Recorvered
                    </Text>
                </View>
                <BarChart
                    data={{
                      labels: time.Time.reverse(),
                      datasets: [{
                        data: recovercasess.Recovercasess
                      }]
                    }}
                    width={Dimensions.get('window').width+200} // from react-native
                    height={220}
                    chartConfig={{
                      backgroundColor: '#182829',
                      backgroundGradientFrom: '#182829',
                      backgroundGradientTo: '#182829',
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(40,167,69, ${opacity})`,
                      labelColor:(opacity = 0) => `rgba(40,167,69, ${opacity})`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                      padding: 10
                    }}
                />
                <View style={{justifyContent:'center',width:'28%',paddingStart:10,}}>
                    <Text style={{fontSize:22,backgroundColor:'#1c1c2b',textAlign:'center',color:'#6b747c',fontWeight:'bold',borderRadius:3}}>
                    Decesed
                    </Text>
                </View>
                <BarChart
                    data={{
                      labels: time.Time.reverse(),
                      datasets: [{
                        data: deathcasess.Deathcasess
                      }]
                    }}
                    width={Dimensions.get('window').width+200} // from react-native
                    height={220}
                    chartConfig={{
                      backgroundColor: '#1c1c2b',
                      backgroundGradientFrom: '#1c1c2b',
                      backgroundGradientTo: '#1c1c2b',
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(121,129, 136, ${opacity})`,
                      labelColor:(opacity = 0) => `rgba(121,129, 136, ${opacity})`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                      padding: 10
                    }}
                />
                </View>:<Text style={{color: 'white', fontSize: 16,fontWeight:"bold"}}>Wait for data comming</Text>}
                </ScrollView>
                <View style={style.india}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'white', fontSize: 16,fontWeight:"bold"}}>Made for </Text>
                        <AntDesign name="heart" size={24} color="#ff073a" />
                        <Text style={{color: 'white', fontSize: 16,fontWeight:"bold"}}> INDIA</Text>
                    </View>
                </View>
                
            </ScrollView> : <View style={{width:"100%",height:"100%" ,alignItems:'center',justifyContent:'center'}}>
                <View><ActivityIndicator style={{ height: 80 }}
            color="#C00"
            size="large"/></View>
                </View>}   
        </View>
        
    )
}
const style=StyleSheet.create({
    india:{
        alignItems: 'center',
        marginTop:6
    },
    headdingstatecell:{
        alignItems:'center',
        width: 150,
        height:50,
        backgroundColor:'#1e1e30',
        margin: 2,
        borderRadius: 3,
        justifyContent: 'center'
    },
    headdingstatecelltext:{
        fontSize:18,
        color: '#d2e336'
    },
    nrmlcell:{
        alignItems:'center',
        width: 140,
        height:50,
        backgroundColor:'#1e1e30',
        margin: 2,
        borderRadius: 3,
        justifyContent: 'center',
        padding: 1
    },
    nrmlcelltext:{
        fontSize:18,
        color: '#d2e336'
    },
    statecell:{
        alignItems:'center',
        width: 150,
        height:80,
        backgroundColor:'#1e1e30',
        margin: 2,
        borderRadius: 3,
        justifyContent: 'center',
        padding: 6
    },
    statecelltext:{
        fontSize:15,
        color: '#bdbdbd',
        fontWeight:'bold'
    },
    cell:{
        alignItems:'center',
        width: 140,
        height:80,
        backgroundColor:'#262735',
        margin: 2,
        borderRadius: 3,
        justifyContent: 'center'
    },
    celltext:{
        fontSize:15,
        color: '#bdbdbd'
    },
    eachheaddingrow:{
        flexDirection:'row',
    },
    vaccinecontainer:{
        alignItems: 'center',
        marginTop:6
    },
    vaccinesubcontainer:{
        backgroundColor:"#2e1e30",
        alignItems:'center',
        paddingStart: 6,
        paddingEnd:6,
        paddingTop: 4,
        paddingBottom:4,
        flexDirection:'row',
        borderRadius:3
    },
    
    vaccinetextstyle:{
        color:'#db5581',
        textAlign: 'center',
        marginStart:4,
        fontSize:12
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
    indigatorcard:{
         flexDirection:'row',
         width: '98%',
         padding : 2,
         height: 100
    },
    confirmcard:{
        backgroundColor: "#331427",
        width: '25%',
        alignItems: 'center',
        borderRadius:5,
        marginStart:2,
         marginEnd:2,
        padding: 3,
        justifyContent:'center',
    },
    confirmtextstyle:{
         color:'#ff073a',
         fontSize:16,
         fontWeight: "bold",
    },
    activecard:{
         backgroundColor: '#12284c',
         width: '25%',
         alignItems: 'center',
         borderRadius: 5,
         marginStart:2,
         marginEnd:2,
        padding: 3,
        justifyContent:'center'
    },
    activetextstyle:{
         color:'#007bff',
         fontSize:16,
         fontWeight: "bold"
    },
    recovercard:{
         backgroundColor: '#1a382d',
         width: '25%',
         alignItems: 'center',
         borderRadius: 5,
         marginStart:2,
         marginEnd:2,
        padding: 3,
        justifyContent:'center'
    },
    recovertextstyle:{
         color:'#28a745',
         fontSize:16,
         fontWeight: "bold"
    },
    decesedcard:{
         backgroundColor: '#262735',
         width: '25%',
         alignItems: 'center',
         borderRadius: 5,
         marginStart:2,
         marginEnd:1,
        padding: 3,
        justifyContent:'center'
    },
    decesedtextstyle:{
         color:'#6b747c',
         fontSize:16,
         fontWeight: "bold"
    },
    
}) 
