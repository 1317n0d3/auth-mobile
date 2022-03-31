import { useEffect, useState } from 'react';
import { NativeSyntheticEvent, ScrollView, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

import { Text, View } from '../components/Themed';

interface IFigureData {
  width: number,
  height: number,
  marginLeft: number,
  marginTop: number,
}

export default function GraphicsEditorScreen() {
  const [locationStart, setLocationStart] = useState({ x: 0, y: 0 }),
    [locationEnd, setLocationEnd] = useState({ x: 0, y: 0 }),
    [figuresData, setFiguresData] = useState<Array<IFigureData>>([]);

  function writeFigureData(endX: number, endY: number): IFigureData {
    return {
      width: endX - locationStart.x > 0 ?
        endX - locationStart.x : locationStart.x - endX,
      height: endY - locationStart.y > 0 ?
        endY - locationStart.y : locationStart.y - endY,
      marginLeft: endX - locationStart.x > 0 ?
        locationStart.x : endX,
      marginTop: endY - locationStart.y > 0 ?
        locationStart.y : endY,
    }
  }

  function drawFigures(): Array<JSX.Element> {
    return figuresData.map((value, i) => {
      return (
        <View
          key={`figure-${i}`}
          style={{
            position: 'absolute',
            backgroundColor: 'gray',
            borderWidth: 1,
            width: value.width,
            height: value.height,
            marginLeft: value.marginLeft,
            marginTop: value.marginTop,
          }}
          onTouchMove={(e) => {
            // console.log(e);
          }} />
      )})
  }

  return (
    <View style={ styles.container }>
      <View style={styles.board} 
      onTouchStart={(e) => {
        setLocationStart({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });      
      }}
      onTouchEnd={(e) => {
        setLocationEnd({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY }); 
        figuresData.push(writeFigureData(e.nativeEvent.pageX, e.nativeEvent.pageY))
      }}>

      { drawFigures() }

      </View>


      <Button onPress={() => setFiguresData([])} style={ styles.button } >
          <Text style={{ fontSize: 20, color: '#fff' }}>удалить</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  board: {
    borderWidth: 1,
    flex: 1,
    overflow: 'hidden',
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
