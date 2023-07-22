//@ts-nocheck
import {Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { text } from 'stream/consumers'
import { FlatList } from 'react-native-gesture-handler';
import {Appbar, Chip, Button} from 'react-native-paper'
import { Buffer } from 'buffer';
import DatePicker from 'react-native-date-picker'
import {USERNAME,PASSWORD} from '/Users/rohaniyer/RailCommuterAssitant_3/password.tsx'

// console.log(api)
const handlePress=async(from:string,to?:string,date:string) => {
  console.log(from,to,date);
  selected_date = date.split('/',3)
  console.log(selected_date[2])

  date = selected_date[1]
  month = selected_date[0]
  year = selected_date[2]
  if (month.length < 2) {
    date = year+'/'+0+month+'/'+date
  }
  else {
    date = year+'/'+month+'/'+date
  }
  console.log(date)
  // console.log(date.split('/',3))

  const username = USERNAME;
  const password = PASSWORD;
  //  if only from then https://api.rtt.io/api/v1/json/search/${from} 
  // if from + to then https://api.rtt.io/api/v1/json/search/${from}/to/${to}
  // if only date is given then show train in ascending order and start with train after current time https://api.rtt.io/api/v1/json/search/${from}/year/month/day
  // if data and time is given then show trains after the time provided by user and till the eod 

  const urlhandler=() => {
  if(from.length == 0) {
    Alert.alert("Please select a station")
  }
  else if (from.length > 0 && to.length == 0) {
    //if (date.length > 0) {
      let myURL=`https://api.rtt.io/api/v1/json/search/${from}/${date}`;
      return myURL
    //} 
    //let myURL=`https://api.rtt.io/api/v1/json/search/${from}`;
    //return myURL

  }
  else if (from.length > 0 && to.length > 0) {
   // if (date.length > 0) {
      let myURL=`https://api.rtt.io/api/v1/json/search/${from}/to/${to}/${date}`;
      return myURL
    //}
    //let myURL=`https://api.rtt.io/api/v1/json/search/${from}/to/${to}`;
    //return myURL

  }
}
  // const URL=`https://api.rtt.io/api/v1/json/search/${from}/to/${to}`
  let my_URL = urlhandler()
  console.log(my_URL)
  const response =  await fetch(my_URL,{
    headers: {
      Authorization:
            'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            'Content-Type': 'application/json',
    }
  })
  const json = await response.json();
  console.log(json);
   
};

const App = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  

  console.log(from,to,date)

  return (
    <SafeAreaView>
      <TextInput 
        placeholder='From'
        onChangeText={newFrom => setFrom(newFrom)}
        defaultValue={from}
        
        clearButtonMode='always' 
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderWidth: 1,
          borderRadius: 1,
          borderColor: 'gray',
          marginBottom: 10,
        }}
        placeholderTextColor='gray'
      />
      <TextInput 
        placeholder='To'
        onChangeText={newTo => setTo(newTo)}
        defaultValue={to}
      
        clearButtonMode='always' 
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderWidth: 1,
          borderRadius: 1,
          borderColor: 'gray',
          marginBottom: 10,
        }}
        placeholderTextColor='gray'
      />
      <Button title="Date" id='DateButton' onPress={() => setOpen(true)}  
        style={{
          borderWidth: 1,
          borderRadius: 1,
          borderColor: 'gray',
          marginBottom: 10,
          placeholder: 'Date',
          color:'black'
          
          
        }} 
        placeholderTextColor='gray'
         >{date.toLocaleDateString()}</Button>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          
        }}
        onCancel={() => {
          setOpen(false)
        
        }}
        
        
      />
       
      <Button mode="contained" onPress= {()=>handlePress(from,to,date.toLocaleDateString())}>Search</Button>
    </SafeAreaView>
  )
}



export default App

const styles = StyleSheet.create({

})
function async() {
  throw new Error('Function not implemented.');
}

