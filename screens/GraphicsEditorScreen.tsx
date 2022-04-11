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
  backgroundColor: string,
  borderWidth: number,
  borderColor: string,
}

const SQUARE = 'SQUARE',
  CIRCLE = 'CIRCLE',
  LINE = 'LINE';

export default function GraphicsEditorScreen() {
  const [locationStart, setLocationStart] = useState({ x: 0, y: 0 }),
    [locationEnd, setLocationEnd] = useState({ x: 0, y: 0 }),
    [figuresData, setFiguresData] = useState<Array<IFigureData | null>>([]),
    [currentFigure, setCurrentFigure] = useState(''),
    [currentCoords, setCurrentCoords] = useState(`${locationStart.x};${locationStart.y}`),
    [currentSize, setCurrentSize] = useState(`${locationEnd.x};${locationEnd.y}`),
    [currentColor, setCurrentColor] = useState('#fff'),
    [currentBorder, setCurrentBorder] = useState('#757575;2'),
    [currentFigureId, setCurrentFigureId] = useState(0),
    [isConfirmData, setIsConfirmData] = useState(false);

  useEffect(() => {setIsConfirmData(false)}, [isConfirmData])

  function writeFigureData(endX: number, endY: number): IFigureData | null {
    switch(currentFigure) {
      case SQUARE:
        return writeSquareData(endX, endY)
      case CIRCLE:
        return writeCircleData(endX, endY)
      case LINE:
        return writeLineData(endX, endY)
      default:
        return null;
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
      backgroundColor: currentColor,
      borderColor: currentBorder.split(';')[0],
      borderWidth: +currentBorder.split(';')[1],
    }
  }

  function writeCircleData(endX: number, endY: number): IFigureData {
    return {
      width: Math.round(Math.sqrt(Math.pow(endX - locationStart.x, 2) + Math.pow(endY - locationStart.y, 2))),
      height: Math.round(Math.sqrt(Math.pow(endX - locationStart.x, 2) + Math.pow(endY - locationStart.y, 2))),
      marginLeft: endX - locationStart.x > 0 ?
        locationStart.x : endX,
      marginTop: endY - locationStart.y > 0 ?
        locationStart.y : endY,
      borderRadius: 9999,
      backgroundColor: currentColor,
      borderColor: currentBorder.split(';')[0],
      borderWidth: +currentBorder.split(';')[1],
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
      backgroundColor: currentColor,
      borderColor: currentBorder.split(';')[0],
      borderWidth: +currentBorder.split(';')[1],
    }
  }

  function drawFigures(): Array<JSX.Element | null> {
    return figuresData.map((value, i) => {
      if(value) {
        return (
          <View
            key={`figure-${i}`}
            style={{
              position: 'absolute',
              backgroundColor: value.backgroundColor,
              borderRadius: value.borderRadius,
              width: value.width,
              height: value.height,
              marginLeft: value.marginLeft,
              marginTop: value.marginTop,
              borderWidth: value.borderWidth,
              borderColor: value.borderColor,
            }}
            onTouchEnd={(e) => {
              // console.log(e);
              setCurrentFigureId(i)
              setCurrentBorder(`${value.borderColor};${value.borderWidth}`)
              setCurrentColor(`${value.backgroundColor}`)
              setCurrentSize(`${value.width};${value.height}`)
              setCurrentCoords(`${value.marginLeft};${value.marginTop}`)
            }} 
          />
        )
      } else return null})
  }

  function clearBoard() {
    setFiguresData([])
    setCurrentFigureId(0)
    setCurrentBorder(`#757575;2`)
    setCurrentColor(`#fff`)
    setCurrentSize(`0;0`)
    setCurrentCoords(`0;0`)
  }

  function confirmFigureData() {
    figuresData[currentFigureId]!.backgroundColor = currentColor
    figuresData[currentFigureId]!.borderColor = currentBorder.split(';')[0]
    figuresData[currentFigureId]!.borderWidth = +currentBorder.split(';')[1]
    figuresData[currentFigureId]!.marginLeft = +currentCoords.split(';')[0]
    figuresData[currentFigureId]!.marginTop = +currentCoords.split(';')[1]
    figuresData[currentFigureId]!.height = +currentSize.split(';')[1]
    figuresData[currentFigureId]!.width = +currentSize.split(';')[0]
    setIsConfirmData(true)
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
              value={ currentBorder }
              onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => setCurrentBorder(text.nativeEvent.text.trim())} 
            />
          </View>
          <View style={ styles.rowContainer }>
            <Text style={ styles.topBarText }>Заливка</Text>
            <TextInput 
              style={{ 
                backgroundColor: currentColor,
                height: 30,
                margin: 7,
                borderWidth: 1,
                padding: 7 
              }} 
              placeholder="Заливка"
              value={ currentColor }
              onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => setCurrentColor(text.nativeEvent.text.trim())} 
            />
          </View>
        </View>
        <View>
          <View style={ styles.rowContainer }>
            <Text style={ styles.topBarText }>Координаты</Text>
            <TextInput 
              style={ styles.input } 
              placeholder="Координаты"
              value={ currentCoords }
              onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => setCurrentCoords(text.nativeEvent.text.trim())} 
            />
          </View>
          <View style={ styles.rowContainer }>
            <Text style={ styles.topBarText }>Размер</Text>
            <TextInput 
              style={ styles.input } 
              placeholder="Размер"
              value={ currentSize }
              onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => setCurrentSize(text.nativeEvent.text.trim())} 
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
        figuresData.push(writeFigureData(e.nativeEvent.locationX, e.nativeEvent.locationY));
        setCurrentFigure('');
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

      <View style={ styles.rowContainer }>
        <Button onPress={confirmFigureData} style={ styles.buttonConfirm } >
            <Text style={{ fontSize: 20, color: '#fff' }}>✓</Text>
        </Button>
        <Button onPress={clearBoard} style={ styles.buttonDelete } >
            <Text style={{ fontSize: 20, color: '#fff' }}>X</Text>
        </Button>
      </View>
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
  buttonConfirm: {
    marginTop: 10,
    backgroundColor: 'green',
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
