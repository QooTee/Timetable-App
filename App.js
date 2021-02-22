import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Pressable, Animated,  PanResponder, TextInput, Image } from 'react-native';

const randomColor = () => {
  const colors = ['#fec619', '#d71e3e', '#570e4a', '#d7e4ff', '#81d82e', '#f6ab49']
  const res = Math.floor(Math.random() * colors.length);
  return colors[res];
}

 const Floatie = (props) => {
    const [dims, setDims] = useState({height: props.array.dims.height, width: props.array.dims.width})
    const [cords, setCords] = useState({x: props.array.cords.x, y: props.array.cords.y})

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
            setCords({x: pan.x, y: pan.y});
            Animated.event(
              [
                null,  
                { dx: pan.x, dy: pan.y}
              ],{useNativeDriver: false}
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
          props.array.cords.x = pan.x;
          props.array.cords.y = pan.y;
          pan.flattenOffset();
        }
      })
    ).current;

    props.array.dims.width = dims.width;
    props.array.dims.height = dims.height;

  return (
      <Animated.View
        style={{
          transform: [{ translateX: cords.x }, { translateY: cords.y }]
        }}
        {...panResponder.panHandlers}
      >
        <View style={{backgroundColor: props.array.backColor, width: dims.width,  height: dims.height,}}>
        </View>
      </Animated.View>
    );
  };


const Page = (props) => {
  return<View
      style = {[styles.workingArea, {flex:9, backgroundColor: '#7bb3ff',}]}>
        {props.obj.floaties.map(floatie => <Floatie key ={props.i + '' + ',' + (floatie.i + '')} array = {floatie} />)}
        <Text>{props.obj.day}</Text>
     </View>
 }

const App = () => {
  const [iDay, setDay] = useState(0);
  const [pages] = useState(new Map);
  const [flag, setFlag] = useState(false);
  const [, update] = useState(0);

  if(!flag){
    pages.set(0, {day: 'Monday', floaties: []});
    pages.set(1, {day: 'Tuesday', floaties: []});
    pages.set(2, {day: 'Wednesday', floaties: []});
    pages.set(3, {day: 'Thursday', floaties: []});
    pages.set(4, {day: 'Friday', floaties: []});
    pages.set(5, {day: 'Saturday', floaties: []});
    pages.set(6, {day: 'Sunday', floaties: []});
    setFlag(true);
  }

  const prevDay = () => pages.get(iDay - 1) ?  setDay(iDay - 1) : setDay(pages.size - 1);
  const nextDay = () => pages.get(iDay + 1) ?  setDay(iDay + 1) : setDay(0);
  

  return (
    <View style = {[styles.hContainer, {flexDirection: 'row', backgroundColor: 'blue'}]}>
      <Page i = {iDay} obj = {pages.get(iDay)}></Page>
      <View style = {styles.buttonContainer}>
        <Pressable
          style = {[styles.cycleButton, {backgroundColor: 'orange'}]}
          onPress = {() => {
            pages.get(iDay).floaties.pop();
            return update(Math.random());
          }}/>
        <Pressable
          style = {[styles.cycleButton, {backgroundColor: 'black'}]}
          onPress = {() => {
            pages.get(iDay).floaties.push(
              {i: pages.get(iDay).floaties.length, backColor: randomColor(), dims: {height: 150, width: 150}, cords: {x: 0, y: 0}}
            );
            return update(Math.random());
          }}/>
        <Pressable
          style = {[styles.cycleButton, {backgroundColor: 'green'}]}
          onPress = {() => {
            return nextDay()
          }}/>
        <Pressable
          style = {[styles.cycleButton, {backgroundColor: 'pink'}]}
          onPress = {() => {
            return prevDay();
          }}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  workingArea: {
    justifyContent:'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cycleButton: {
    width: '100%',
    height:'10%', 
    color: 'blue',
  },
})

export default App;;

/*
app needs to have: 
  1. starting menu 
    a) options to setup (1 week, 2 weeks, month)
    b) quick navigation to needed day (should default to current day)
    c) entry point into main app (pages with floaties)
  2. main app
    A) floaties
      a) should accept images and text
      b) be customizable (backgroundcolor, textcolor);
      c) have title (when floatie becomes small, only title is shown)
      d) be able to be locked in place
      e) be able to be deleted
      f) be able to be minimized (only title is shown)
    B) buttons  
      a) have decently looking icons and not blocks of color
      b) obvious function 
      c) quick actions on all floaties (locking minimizing)
      d) customizing of page(backgroundcolor)
*/