import AsyncStorage from '@react-native-async-storage/async-storage';

function fs() {
  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key , jsonValue)
    } catch (e) {
      console.log(e);
    }
  }
  
  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key, console.log)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log(e);
    }
  }

  const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      console.log(e);
    }
  }
}

export default fs;