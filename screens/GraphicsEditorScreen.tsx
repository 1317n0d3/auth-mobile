import { useEffect, useState } from 'react';
import { NativeSyntheticEvent, ScrollView, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

import { Text, View } from '../components/Themed';

interface IFigureData {
  width: number,
  height: number,
  marginLeft: number,
  marginTop: number,
  borderRadius: number,
}

const SQUARE = 'SQUARE',
  CIRCLE = 'CIRCLE',
  LINE = 'LINE';

export default function GraphicsEditorScreen() {
  const [locationStart, setLocationStart] = useState({ x: 0, y: 0 }),
    [locationEnd, setLocationEnd] = useState({ x: 0, y: 0 }),
    [figuresData, setFiguresData] = useState<Array<IFigureData>>([]),
    [currentFigure, setCurrentFigure] = useState(SQUARE);

  function writeFigureData(endX: number, endY: number): IFigureData {
    switch(currentFigure) {
      case SQUARE:
        return writeSquareData(endX, endY)
      case CIRCLE:
        return writeCircleData(endX, endY)
      case LINE:
        return writeLineData(endX, endY)
      default:
        return writeSquareData(endX, endY)
    }
  }

  function writeSquareData(endX: number, endY: number): IFigureData {
    return {
      width: endX - locationStart.x > 0 ?
        endX - locationStart.x : locationStart.x - endX,
      height: endY - locationStart.y > 0 ?
        endY - locationStart.y : locationStart.y - endY,
      marginLeft: endX - locationStart.x > 0 ?
        locationStart.x : endX,
      marginTop: endY - locationStart.y > 0 ?
        locationStart.y : endY,
      borderRadius: 0,
    }
  }

  function writeCircleData(endX: number, endY: number): IFigureData {
    return {
      width: endX - locationStart.x > 0 ?
        endX - locationStart.x : locationStart.x - endX,
      height: endY - locationStart.y > 0 ?
        endY - locationStart.y : locationStart.y - endY,
      marginLeft: endX - locationStart.x > 0 ?
        locationStart.x : endX,
      marginTop: endY - locationStart.y > 0 ?
        locationStart.y : endY,
      borderRadius: 9999,
    }
  }

  function writeLineData(endX: number, endY: number): IFigureData {
    return {
      width: endX - locationStart.x > 0 ?
        endX - locationStart.x : locationStart.x - endX,
      height: 1,
      marginLeft: endX - locationStart.x > 0 ?
        locationStart.x : endX,
      marginTop: endY - locationStart.y > 0 ?
        locationStart.y : endY,
      borderRadius: 0,
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
            borderRadius: value.borderRadius,
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

      <View style={styles.rowContainer}>
        <View>
          <View style={ styles.rowContainer }>
            <Text style={ styles.topBarText }>Линии</Text>
            <TextInput 
              style={ styles.input } 
              placeholder="Линии"
              value='#757575;1'
              onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => {}} 
            />
          </View>
          <View style={ styles.rowContainer }>
            <Text style={ styles.topBarText }>Заливка</Text>
            <TextInput 
              style={ styles.input } 
              placeholder="Заливка"
              value='#292929'
              onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => {}} 
            />
          </View>
        </View>
        <View>
          <View style={ styles.rowContainer }>
            <Text style={ styles.topBarText }>Координаты</Text>
            <TextInput 
              style={ styles.input } 
              placeholder="Координаты"
              value='0;0'
              onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => {}} 
            />
          </View>
          <View style={ styles.rowContainer }>
            <Text style={ styles.topBarText }>Размер</Text>
            <TextInput 
              style={ styles.input } 
              placeholder="Размер"
              value='0;0'
              onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => {}} 
            />
          </View>
        </View>
      </View>

      <View style={styles.board} 
      onTouchStart={(e) => {
        setLocationStart({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY });      
      }}
      onTouchEnd={(e) => {
        setLocationEnd({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY }); 
        figuresData.push(writeFigureData(e.nativeEvent.locationX, e.nativeEvent.locationY))
      }}>

      { drawFigures() }

      </View>

      <View style={ styles.rowContainer }>
        <Button onPress={() => setCurrentFigure(SQUARE)} 
          style={ currentFigure === SQUARE ? styles.figureButtonActive : styles.figureButton } 
          >
            <Text style={ styles.figureButtonText }>□</Text>
        </Button>
        <Button onPress={() => setCurrentFigure(CIRCLE)} 
          style={ currentFigure === CIRCLE ? styles.figureButtonActive : styles.figureButton } 
          >
            <Text style={ styles.figureButtonText }>○</Text>
        </Button>
        <Button onPress={() => setCurrentFigure(LINE)} 
          style={ currentFigure === LINE ? styles.figureButtonActive : styles.figureButton } 
          >
            <Text style={ styles.figureButtonText }>-</Text>
        </Button>
      </View>


      <Button onPress={() => setFiguresData([])} style={ styles.buttonDelete } >
          <Text style={{ fontSize: 20, color: '#fff' }}>X</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topBarText: {
    fontSize: 16,
    marginTop: 12,
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
    height: 30,
    margin: 7,
    borderWidth: 1,
    padding: 7,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#757575',
  },
  buttonDelete: {
    marginTop: 10,
    backgroundColor: '#d10000',
  },
  figureButtonText: {
    fontSize: 40,
    color: '#fff'
  },
  figureButton: {
    marginTop: 10,
    width: 100,
    backgroundColor: '#292929',
  },
  figureButtonActive: {
    marginTop: 10,
    width: 100,
    backgroundColor: '#ff9d42',
  },
  hidden: {
    display: 'none',
  },
  error: {
    paddingTop: 10,
    color: 'red',
  }
});
