import React, { useRef, useState } from 'react';
import { Text, View, Animated,  PanResponder, Pressable,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'
import MultilineText from './multilineText';

const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key , jsonValue)
    } catch (e) {
      console.log(e);
    }
}

const Floatie = (props) => {
  const [dims, setDims] = useState(props.dims);
  const [cords, setCords] = useState(props.cords);
  const [changeFlag, setChangeFlag] = useState(false);
  const [text, setText] = useState(props.contents.text);
  const [title, setTitle] = useState(props.contents.title);
  const [focused, focus] = useState(false);
  const [minimized, minimize] = useState(props.minimized);

  const assebmleFloatie = () => {
      return (
        {
          dims: dims,
          cords: cords,
          minimized: minimized,
          contents: {title: title, text: text,},
        }
      )
  }

  React.useEffect(() => {
    storeData(props.i, assebmleFloatie());
  }, [text, minimized, changeFlag])

  const pan = useRef(new Animated.ValueXY({x: cords.x, y: cords.y})).current;
  
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (e, gestureState) => {
        if(gestureState.numberActiveTouches === 1){
          setCords({
            x: pan.x, 
            y: pan.y
          });
          Animated.event(
            [ null, {dx: pan.x, dy: pan.y}],
            {useNativeDriver: false}
          )(e, gestureState);
          return;
        };
        if(gestureState.numberActiveTouches === 2){
          const touches = e.touchHistory.touchBank.slice(0, 2);
          setDims({
            width: Math.abs(touches[0].currentPageX - touches[1].currentPageX),
            height: Math.abs(touches[0].currentPageY - touches[1].currentPageY)
          })
          return;
        }
      },
    onPanResponderRelease: () => {
        setChangeFlag(changeFlag => !changeFlag);
        pan.flattenOffset();
      }
    })
  ).current;

  if(minimized) {
    return (
      <Animated.View
        style={{
          position: 'absolute', transform: [{ translateX: cords.x }, { translateY: cords.y }]
        }}
        {...panResponder.panHandlers}>
        <Pressable onLongPress = {(() => { 
          minimize(false)
        })}>
        <View style={styles.miniFloatie}>
          <Text>{title}</Text>
        </View>
        </Pressable>
      </Animated.View>
    )
  }

  if(focused){
    return (
      <View
        style={{
          position: 'absolute', height: '100%', width: '100%', zIndex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0, 0.8)', padding: '10%'}}
        {...panResponder.panHandlers}
      >
        <Pressable 
          onLongPress = {() => focus(false)}>
        <View style={[styles.floatie, {width: '100%',  height: '100%', }]}>
            <MultilineText 
              value = {text}
              onChangeText = {inp => {
                const line = inp.indexOf(`\n`); 
                (line === -1) ? setTitle(inp) : setTitle(inp.slice(0, inp.indexOf(`\n`)));
                setText(inp);
              }}
            />
            <View style = {{flexDirection: 'row-reverse', width: '100%'}}>
              <Pressable>
                  <View style = {[styles.floatie, {backgroundColor:'red', width: 50, height: 50}]}/>
              </Pressable>
            </View>
        </View>
        </Pressable>
      </View>
    )
  }

  return (
      <Animated.View
        style={{
          position: 'absolute', transform: [{ translateX: cords.x }, { translateY: cords.y }]
        }}
        {...panResponder.panHandlers}
      >
        <Pressable 
        onPress = {() => focus(true)}
        onLongPress = {() => minimize(true)}>
        <View style={[styles.floatie, {width: dims.width,  height: dims.height,}]}>
            <MultilineText 
              value = {text}
              onChangeText = {inp => {
                const line = inp.indexOf(`\n`); 
                (line === -1) ? setTitle(inp) : setTitle(inp.slice(0, inp.indexOf(`\n`)));
                setText(inp);
              }}
            />
        </View>
        </Pressable>
      </Animated.View>
    );
};


export default Floatie;