import { useEffect, useState } from 'react';
import { NativeSyntheticEvent, ScrollView, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

import { Text, View } from '../components/Themed';

export default function GraphicsEditorScreen() {
  const [locationStart, setLocationStart] = useState({ x: 0, y: 0 }),
    [locationEnd, setLocationEnd] = useState({ x: 0, y: 0 }),
    figures = ([]);

  function createFigure() {
    return (
      <View style={{ backgroundColor: 'gray', width: locationEnd.x - locationStart.x, height: locationEnd.y - locationStart.y, marginLeft: locationStart.x, marginTop: locationStart.y }} ></View>
    )
  }

  return (
    <View style={styles.container} 
    onTouchStart={(e) => {
      console.log(e.nativeEvent.locationX, e.nativeEvent.locationY);
      setLocationStart({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY });      
    }}
    onTouchEnd={(e) => {
      setLocationEnd({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY });  
      figures.push(createFigure())    
    }}>

    { figures }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#194bff',
  },
  buttonDisabled: {
    marginTop: 10,
    backgroundColor: '#757575',
  },
  hidden: {
    display: 'none',
  },
  error: {
    paddingTop: 10,
    color: 'red',
  }
});
