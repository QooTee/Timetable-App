import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#5CDB95'

  },
  bText: {
    color: '#E8A87C', 
    fontSize: 20,
    fontWeight: 'bold'
  },
  bForm: {
    margin: '5%',
    backgroundColor: '#41B3A3', 
    width: 200, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2,  
    borderColor: '#C38D9E', 
    borderRadius: 10,
  },
  floatie: {
    backgroundColor: '#41B3A3', 
    borderWidth: 1, 
    borderRadius: 20,
    padding: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  miniFloatie: {
    backgroundColor: '#E7717D',
    borderWidth: 1,
    borderRadius: 20,
    padding: 7,
    width: 150,
    height: 60,
    alignItems:'center',
    justifyContent: 'center'
  },
  ratioMore: {
    width: '100%',
  },
  ratioLess: {
    height: '100%'
  }
})

