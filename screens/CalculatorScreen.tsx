import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function CalculatorScreen() {
  const [value, setValue] = useState<string>('0'),
    [bufValue, setBufValue] = useState<number>(0),
    [isFraction, setIsFraction] = useState<boolean>(false);

  const maxValueLength = 10

  useEffect(() => {
    if(!isFraction) setValue(+value + '')
  }, [value])

  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'right', marginRight: 25, marginTop: 15, fontSize: 20}} >{bufValue}</Text>
      {/* <Text style={styles.title}>{value === '' ? 0 : value}</Text> */}
      <Text style={styles.title}>{value}</Text>

      
      <View style={styles.buttonsRow}>
        <Button
          onPress={() => {
            if(value.length < maxValueLength) setValue(value + 1)
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>1</Text>
        </Button>
        <Button
          onPress={() => {
            if(value.length < maxValueLength) setValue(value + 2)
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>2</Text>
        </Button>
        <Button
          onPress={() => {
            if(value.length < maxValueLength) setValue(value + 3)
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>3</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>+</Text>
        </Button>
      </View>

      <View style={styles.buttonsRow}>
        <Button
          onPress={() => {
            if(value.length < maxValueLength) setValue(value + 4)
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>4</Text>
        </Button>
        <Button
          onPress={() => {
            if(value.length < maxValueLength) setValue(value + 5)
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>5</Text>
        </Button>
        <Button
          onPress={() => {
            if(value.length < maxValueLength) setValue(value + 6)
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>6</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>-</Text>
        </Button>
      </View>

      <View style={styles.buttonsRow}>
        <Button
          onPress={() => {
            if(value.length < maxValueLength) setValue(value + 7)
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>7</Text>
        </Button>
        <Button
          onPress={() => {
            if(value.length < maxValueLength) setValue(value + 8)
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>8</Text>
        </Button>
        <Button
          onPress={() => {
            if(value.length < maxValueLength) setValue(value + 9)
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>9</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>/</Text>
        </Button>
      </View>

      <View style={styles.buttonsRow}>
        <Button
          onPress={() => {
            if(!isFraction) {
              setValue(value === '' ? '0.' : value + '.')
              setIsFraction(true)
            }
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>,</Text>
        </Button>
        <Button
          onPress={() => {
            if(value.length < maxValueLength) setValue(value + 0)
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>0</Text>
        </Button>
        <Button
          onPress={() => {
            setValue('0')
            setBufValue(0)
            setIsFraction(false)
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>C</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>*</Text>
        </Button>
      </View>

      <View style={styles.buttonsRow}>
        <Button
          onPress={() => {
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>√</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>1/x</Text>
        </Button>
        <Button
          onPress={() => {
            setValue(-(+value) + '')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>+/-</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>=</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    textAlign: 'right',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    width: 70,
    // height: 70,
    borderRadius: 100,
    marginTop: 10,
    backgroundColor: '#194bff',
  },
  buttonsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    lineHeight: 50,
    fontSize: 23,
    color: '#fff',
  },
});
