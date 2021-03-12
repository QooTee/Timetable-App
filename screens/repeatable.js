import React from 'react';
import { Pressable, View, Text } from 'react-native';
import styles from '../common/styles';
import PressableText from '../common/pressableText'

const EventsPage = () => {
  return( 
  <View style = {styles.container}>
    <Text style = {styles.bText}>SETUP EVENT:</Text>
    <PressableText style = {styles.bForm} text = 'Weekly' tintStyle = {styles.bText} onPress = {() => {}}></PressableText>
    <PressableText style = {styles.bForm} text = 'Biweekly' tintStyle = {styles.bText} onPress = {() => {}}></PressableText>
    <PressableText style = {styles.bForm} text = 'Monthly' tintStyle = {styles.bText} onPress = {() => {}}></PressableText>
    <PressableText style = {styles.bForm} text = 'Yearly' tintStyle = {styles.bText} onPress = {() => {}}></PressableText>
  </View>
  )
}

export default EventsPage;