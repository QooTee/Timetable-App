import React from 'react';
import { Pressable, View, Text } from 'react-native';

const PressableText = (props) =>{
  return (
  <Pressable 
    onPress = {props.onPress}>
    <View style = {props.style}>
      <Text style = {props.tintStyle}>{props.text}</Text>
    </View>
  </Pressable>
  )
};

export default PressableText;