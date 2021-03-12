import React, { useRef, useState } from 'react';
import { Text, View, Pressable, Animated,  PanResponder, Button, Image, RefreshControlBase } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './notes-styles';
import Floatie from '../common/floatie';

const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key , jsonValue)
      console.log(`set value ${value} to key ${key}`)
    } catch (e) {
      console.log(e);
    }
}
  

const getData = async (key, cb) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key, cb/*console.log*/);
    return jsonValue != null ? JSON.parse(jsonValue) : 0;
  } catch(e) {
    console.log(e);
  }
}

const Page = (props) => { 
  const [floaties, setFloaties] = useState([]);

  const getFloatie = async (floatieKey) => {
    try{
    const res = await getData(props.i + floatieKey);
    return res;
    }catch(e){
      console.log(e);
    }
  }
  
  const getAllFloaties = async () => {
    const res = [];
    const amount = await getData(props.i);
    for(let i = 0; i < amount; i++){
      const floatie = await getFloatie(i.toString())
      if(floatie) res.push(floatie);
    }
    setFloaties(res);
  }

  React.useEffect(() => {
    getAllFloaties();
  }, [props])

  return (
    <View style = {[styles.workingArea, {flex: 17, backgroundColor: '#7bb3ff',}]}>
      <Text style = {{fontWeight: 'bold', fontSize: 17}}>{props.i}</Text>
        {floaties.map((floatie, index) => <Floatie key ={props.i + index.toString()} i = {props.i + index.toString()} {...floatie} />)}
    </View>
  )
 }

const Notes = ({navigation}) => {

  const [day, setDay] = useState(0);
  const [num, setNum] = useState(0);

  const getNum = async (dayString) => {
    try{
    const data = await getData(dayString);
    return data;
    }catch(e){
      console.log(e);
    }
  }

  React.useEffect(() => {
    getData(day.toString, (data) => {
      setNum(data === null ? 0 : data);
    })

  }, [123]);

  const Floatie = () => (
    {
      dims: {height: 150, width: 150},
      cords: {x: 0, y: 20},
      minimized: false,
      contents: {title: '' , text: '',}
    }
  )

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return ( 
          <Pressable
            onPress = {async () => {
              try{
                await storeData(day.toString() + num.toString(), Floatie())
                setNum(num + 1);
              }catch(e){
                console.log(e);
              }
            }}>
              <Image source = {require('../img/addbutton.png')}/>
          </Pressable>
        )
      },
    });
  }, [navigation, day, num]);

  React.useEffect(() => {
    storeData(day.toString(), num);
  }, [num])

  return (
    <View style = {[styles.hContainer, {flexDirection: 'column-reverse', backgroundColor: '#7bb3ff' }]}>
      <View style = {styles.buttonContainer}>
        <Pressable
          style = {styles.cycleButton}
          onPress = {() => {
            day > 0 ? setDay(day - 1) : setDay(6);
          }}>
            <Image source = {require('../img/leftbutton.png')}/>
        </Pressable>
        <Pressable
          style = {styles.cycleButton}
          onPress = {() => {
            day < 6 ? setDay(day + 1): setDay(0);
          }}
        >
            <Image source = {require('../img/rightbutton.png')}/>
        </Pressable>
      </View>
      <Page key = {day.toString()} i = {day.toString()}></Page>
    </View>
  )
}

export default Notes;