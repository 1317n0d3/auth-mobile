import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function CalculatorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>0</Text>

      
      <View style={styles.buttonsRow}>
        <Button
          onPress={() => {
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>1</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>2</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
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
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>4</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>5</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
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
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>7</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>8</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
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
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>,</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
          }}
          style={styles.button}>
          <Text style={ styles.buttonText }>0</Text>
        </Button>
        <Button
          onPress={() => {
            alert('1')
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
            alert('1')
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
    paddingTop: 30,
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
