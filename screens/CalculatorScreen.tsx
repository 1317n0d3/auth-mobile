import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function CalculatorScreen() {
  const operations = {
    sum: 'SUM',
    subtract: 'SUB',
    multiplicate: 'MUL',
    division: 'DIV',
    squareRoot: 'SQR',
    divisionOfOne: 'DOO',
  };
  
  const maxValueLength = 10

  const [value, setValue] = useState<string>(''),
    [bufValue, setBufValue] = useState<number>(0),
    [isFraction, setIsFraction] = useState<boolean>(false),
    [operation, setOperation] = useState<string>(operations.sum);

  function calculate(): number {
    let res: any = 0;

    switch(operation) {
      case operations.sum:
        res = +value + bufValue
        break;
      case operations.subtract:
        res = bufValue - (+value)
        break;
      case operations.division:
        res = bufValue / (+value)
        break;
      case operations.multiplicate:
        res = bufValue * (+value)
        break;
    }

    setBufValue(res)
    setValue('')
    setIsFraction(false)

    res = res + '';
    return +res.substring(0, maxValueLength);
  }

  useEffect(() => {
    setIsFraction(value.includes('.') ? true : false)
  }, [value])

  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'right', marginRight: 25, marginTop: 15, fontSize: 20}} >{bufValue}</Text>
      <Text style={styles.title}>{value === '' ? 0 : value}</Text>
      {/* <Text style={styles.title}>{value}</Text> */}

      
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
            setOperation(operations.sum)
            calculate()
          }}
          style={operation === operations.sum ? styles.buttonActive : styles.buttonFunctional}>
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
            setOperation(operations.subtract)
            calculate()
          }}
          style={operation === operations.subtract ? styles.buttonActive : styles.buttonFunctional}>
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
            setOperation(operations.division)
            calculate()
          }}
          style={operation === operations.division ? styles.buttonActive : styles.buttonFunctional}>
          <Text style={ styles.buttonText }>/</Text>
        </Button>
      </View>

      <View style={styles.buttonsRow}>
        <Button
          onPress={() => {
            if(!isFraction) {
              setValue(value === '' ? '0.' : value + '.')
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
            setValue('')
            setBufValue(0)
            setIsFraction(false)
            setOperation(operations.sum)
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>C</Text>
        </Button>
        <Button
          onPress={() => {
            setOperation(operations.multiplicate)
            calculate()
          }}
          style={operation === operations.multiplicate ? styles.buttonActive : styles.buttonFunctional}>
          <Text style={ styles.buttonText }>*</Text>
        </Button>
      </View>

      <View style={styles.buttonsRow}>
        <Button
          onPress={() => {
            setValue((Math.sqrt((+value)) + '').substring(0, maxValueLength))
          }}
          style={styles.buttonFunctional}>
          <Text style={ styles.buttonText }>√</Text>
        </Button>
        <Button
          onPress={() => {
            setValue(((1 / (+value)) + '').substring(0, maxValueLength))
          }}
          style={styles.buttonFunctional}>
          <Text style={ styles.buttonText }>1/x</Text>
        </Button>
        <Button
          onPress={() => {
            setValue(-(+value) + '')
          }}
          style={styles.buttonFunctional}>
          <Text style={ styles.buttonText }>+/-</Text>
        </Button>
        <Button
          onPress={() => {
            setValue(calculate() + '')
            setBufValue(0)
            setOperation(operations.sum)
          }}
          style={styles.buttonFunctional}>
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
    borderRadius: 100,
    marginTop: 10,
    backgroundColor: '#757575',
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
  buttonActive: {
    width: 70,
    borderRadius: 100,
    marginTop: 10,
    backgroundColor: '#ff9d42',
  },
  buttonFunctional: {
    width: 70,
    borderRadius: 100,
    marginTop: 10,
    backgroundColor: '#292929',
  }
});
