import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useIsFocused } from '@react-navigation/core';

export default function Home() {
    const isfocused= useIsFocused()
    const [data,setdata]= useState({})
    useEffect(()=>{
      axios.get("https://api.covid19india.org/v4/min/data.min.json").then(res=>{
        setdata(res.data)
      })
    },[isfocused])
    //console.log(data.AN.delta7.confirmed)
    let state=Object.entries(data);
    return (
        <View>
            
            <ScrollView>
            <View>
                <View style={style.separator}>
                    <Text>State</Text>
                    <Text>Confirmed</Text>
                    <Text>Recovered</Text>
                </View>
            </View>
            {state.map((item,index)=>
                <View>
                       <View key={index} style={style.separator}>
                        <Text key={index}>{item?.[0]}</Text>
                        <Text>{item?.[1]?.delta?.confirmed || 0}</Text>
                        <Text>{item?.[1]?.delta?.recovered || 0}</Text>
                       </View>
                </View>
                )}
            </ScrollView>
        </View>
    )
}
const style=StyleSheet.create({
    separator:{
        flexDirection:'row',
        justifyContent:'space-around'
    }
})