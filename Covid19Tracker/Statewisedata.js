import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/core';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function Statewisedata({route}) {
    const insets = useSafeAreaInsets()
    const isfocused= useIsFocused()
    const {statename, stated , stcode} =route.params
    const [statedata,setstatedata] =useState({})
    const [disdata,setdisdata] =useState([])
    const [coviddata,setcoviddata] = useState([])
    useEffect(()=>{
        setstatedata(JSON.parse(stated))
        setdisdata(Object.entries(JSON.parse(stated).districts).sort((a,b)=>{return  b?.[1]?.total?.confirmed - a?.[1]?.total?.confirmed}))
        axios.get("https://api.covid19india.org/v4/min/timeseries.min.json").then(res=>{
            
            const data=Object.entries(res.data)
            const totdata=data.find(item=>item?.[0]==stcode)
            setcoviddata(Object.entries(totdata?.[1]?.dates))
            
        })
    },[isfocused])
    
    //console.log(statedata)
    //console.log(disdata)
    //console.log(coviddata)
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
        else if(c){
            return c
        }
        else if(c && r){
            return c-r
        }
        else{
            return 0
        }
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
    return (
        <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: '#161625', width: "100%",height:'100%'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{alignItems: 'center'}}>
                    <View style={style.titlecontainer}>  
                        <Text style={style.primarytitle}>COVID19</Text>
                        <Text style={style.secondarytitle}>INDIA</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',margin: 5,justifyContent: 'space-between'}}>  
                        <View style={{justifyContent:'center',width:"55%"}}>
                            <Text style={style.statetitle}>{statename}</Text>
                        </View>
                        <View style={{justifyContent:'center'}}>
                            <Text style={style.statetesttitle}>Tested</Text>
                            <Text style={style.statetest}>{statedata?.total?.tested}</Text>
                            <Text style={style.statetesttitle}>Tested Per 1 Million</Text>
                            <Text style={style.statetest}>{(1000000*(statedata?.total?.tested/statedata?.meta?.population)).toFixed(1) || 0}</Text>
                        </View>
                </View>
                <View style={style.indigatorcard}>
                    <View style={style.confirmcard}>
                        <Text style={style.confirmtextstyle}>Confirmed</Text>
                        {statedata?.delta?.confirmed ? <Text style={{color: '#ae0c33' , fontSize:10, fontWeight:"bold"}}>+{statedata?.delta?.confirmed}</Text> : <Text style={{color: '#ae0c33' , fontSize:10, fontWeight:"bold"}}></Text>}
                        <Text style={{color: '#ff073a' , fontSize:15 , fontWeight:"bold"}}>{statedata?.total?.confirmed || 0}</Text>
                    </View>
                    <View style={style.activecard}>
                        <Text style={style.activetextstyle}>Active</Text>
                        {parentactivecase(statedata?.delta?.confirmed,statedata?.delta?.recovered,statedata?.delta?.deceased,statedata?.delta?.other)}
                        <Text style={{color: '#007bff' , fontSize:15 , fontWeight:"bold"}}>{activecases(statedata?.total?.confirmed,statedata?.total?.recovered,statedata?.total?.deceased,statedata?.total?.other)}</Text>
                    </View>
                    <View style={style.recovercard}>
                        <Text style={style.recovertextstyle}>Recovered</Text>
                        {statedata?.delta?.recovered ? <Text style={{color: '#237a3c' , fontSize:10, fontWeight:"bold"}}>+{statedata?.delta?.recovered}</Text> : <Text style={{color: '#237a3c' , fontSize:10, fontWeight:"bold"}}></Text>}
                        <Text style={{color: '#28a745' , fontSize:15 , fontWeight:"bold"}}>{statedata?.total?.recovered || 0}</Text>
                    </View>
                    <View style={style.decesedcard}>
                        <Text style={style.decesedtextstyle}>Decesed</Text>
                        {statedata?.delta?.deceased ? <Text style={{color: '#4d525d' , fontSize:10, fontWeight:"bold"}}>+{statedata?.delta?.deceased}</Text> : <Text style={{color: '#4d525d' , fontSize:10, fontWeight:"bold"}}></Text>}
                        <Text style={{color: '#6b747c' , fontSize:15 , fontWeight:"bold"}}>{statedata?.total?.deceased || 0}</Text>
                    </View>
                </View>
                <View  style={style.vaccinecontainer}>
                    <View style={style.vaccinesubcontainer}>
                        <Ionicons name="shield-checkmark-sharp" size={18} color="#db5581" />
                        <Text style={style.vaccinetextstyle}>{statedata?.total?.vaccinated1 + statedata?.total?.vaccinated2 || 0} vaccine doses administered</Text>
                    </View>
                </View>

                <View style={{marginTop:4}}>
                    
                        <View style={{width:Dimensions.get('window').width-15,flexDirection:'column',paddingLeft:10,paddingEnd:10}}>
                            {fstvaccinetext(statedata?.meta?.population,statedata?.total?.vaccinated1)}
                            {graphdata(statedata?.meta?.population , statedata?.total?.vaccinated1 , statedata?.total?.vaccinated2)}
                            {secvaccinetext(statedata?.meta?.population,statedata?.total?.vaccinated2)}
                        </View>
                    
                </View>
                
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:Dimensions.get('window').width,marginTop:10}}>
                    
                    <View style={{flexDirection:'column'}}>
                        <View style={style.eachheaddingrow} >
                           <View style={style.headdingstatecell}>
                               <Text style={style.headdingstatecelltext}>Districts</Text>
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

                        {disdata.map((item,index)=>
                                <View style={style.eachheaddingrow} key={index}>
                                <View style={style.statecell}>
                                    <Text  style={style.statecelltext}>{item?.[0]}</Text>
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
                                    <Text style={style.celltext}>{item?.[1]?.total?.tested? (100000*(item?.[1]?.total?.tested/item?.[1]?.meta?.population)).toFixed(1) : 0}</Text>
                                </View>
                                <View style={style.cell}>
                                    <Text style={style.celltext}>{item?.[1]?.total?.vaccinated1 || 0}</Text>
                                </View>
                                <View style={style.cell}>
                                    <Text style={style.celltext}>{item?.[1]?.total?.vaccinated2 || 0}</Text>
                                </View>
                                <View style={style.cell}>
                                    <Text style={style.celltext}>{item?.[1]?.total?.vaccinated1 && item?.[1]?.total?.vaccinated2 ?(100000*((item?.[1]?.total?.vaccinated1+item?.[1]?.total?.vaccinated2)/item?.[1]?.meta?.population)).toFixed(1) : 0}</Text>
                                </View>
                                </View>
                            )
                        }    
                    </View>

                </ScrollView>
               

                <View style={style.india}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'white', fontSize: 16,fontWeight:"bold"}}>Made for </Text>
                        <AntDesign name="heart" size={24} color="#ff073a" />
                        <Text style={{color: 'white', fontSize: 16,fontWeight:"bold"}}> INDIA</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
const style=StyleSheet.create({
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
    india:{
        alignItems: 'center',
        marginTop:6
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
    statetitle:{
        color:'#ff073a',
        textAlign:'center',
        fontSize: 30,
        fontWeight:'bold',
        backgroundColor:'#231826',
        paddingStart:4,
        paddingEnd:4,
        borderRadius:4
   },
   statetesttitle:{
        color:'#6f568c',
        textAlign:'center',
        fontSize: 12,
        fontWeight:'bold'
    },
   statetest:{
        color:'#9673b9',
        textAlign:'center',
        fontSize: 20,
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
