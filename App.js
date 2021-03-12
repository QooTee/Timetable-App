import React from 'react';
import Notes from './screens/notes';
import LandingPage from './screens/landing'
import EventsPage from './screens/repeatable'
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const PageOne = ({navigation}) => {
  return <LandingPage navigation = {navigation}/>
}

const PageTwo = ({navigation}) => {
  return <Notes navigation = {navigation}/>
}

const PageThree = () => {
  return <EventsPage/>
}

const App = () => {
  const Stack = createStackNavigator();
  return( 
  <NavigationContainer>
    <Stack.Navigator  screenOptions = {{headerStyle: {backgroundColor: '#FC4445'}, headerTitleAlign: 'center'}}>
      <Stack.Screen name = 'Home' component={PageOne} options = {{title: 'Home',}}/>
      <Stack.Screen name = 'Notes' component={PageTwo} options = {{title: 'Notes',}}/>
      <Stack.Screen name = 'Repeatable' component= {PageThree} options = {{title: 'Repeatable',}}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App;;
