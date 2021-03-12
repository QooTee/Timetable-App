import React, { useRef, useState } from 'react';
import { TextInput, TextPropTypes, } from 'react-native';

const MultilineText = (props) =>{
  return (
  <TextInput {...props}
  multiline/>)
}

export default MultilineText;
