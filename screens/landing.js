import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Pressable, View, Text } from 'react-native';
import PressableText from '../common/pressableText';
import styles from '../common/styles'

const LandingPage = ({navigation}) => {
  return( 
    <View style = {styles.container}>
      <PressableText 
        onPress = {() => {
          navigation.navigate('Notes');
        }}
        text = {'Notes'}
        tintStyle = {styles.bText}
        style = {styles.bForm}/>
      <PressableText 
        onPress = {() => {
          navigation.navigate('Repeatable');
        }}
        text = {'Repeatable'}
        tintStyle = {styles.bText}
        style = {styles.bForm}/>
    </View>
  )
}

export default LandingPage;