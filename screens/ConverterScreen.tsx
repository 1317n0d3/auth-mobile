import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NativeSyntheticEvent, ScrollView, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

import { Text, View } from '../components/Themed';

export default function ConverterScreen() {
  type langTranslate = {
    [key: string]: string
  }
  type languageObj = {
    [key: string]: langTranslate
  }

  interface metricsObject {
    metre: number,
    kilometer: number,
    centimeter: number,
    ft: number,
    mile: number,
    inch: number,
  }

  const metrics = {
    metre: 'metre',
    kilometer: 'kilometer',
    centimeter: 'centimeter',
    ft: 'ft',
    mile: 'mile',
    inch: 'inch',
  }

  const lang: languageObj = {
    ru: {
      metre: 'метр',
      kilometer: 'километр',
      centimeter: 'сантиметр',
      ft: 'фут',
      mile: 'миля',
      inch: 'дюйм',
      input: 'Введите число',
    },
    en: {
      metre: 'metre',
      kilometer: 'kilometer',
      centimeter: 'centimeter',
      ft: 'ft',
      mile: 'mile',
      inch: 'inch',
      input: 'Input number',
    },
  }

  const [selectedLanguage, setSelectedLanguage] = useState<string>('ru'),
    [metric, setMetric] = useState<string>(metrics.metre),
    [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(value.replace(',', '.'))
  }, [value])

  function calculate(): metricsObject {
    let res: metricsObject = {
      metre: 0,
      kilometer: 0,
      centimeter: 0,
      ft: 0,
      mile: 0,
      inch: 0,
    }

    switch(metric) {
      case metrics.metre:
        res.metre = +value
        res.kilometer = +value / 1000
        res.centimeter = +value * 100
        res.ft = +value * 3.281
        res.mile = +value / 1609
        res.inch = +value * 39.37
        break;
      case metrics.kilometer:
        res.metre = +value * 1000
        res.kilometer = +value
        res.centimeter = +value * 100000
        res.ft = +value * 3281
        res.mile = +value / 1.609
        res.inch = +value * 39370
        break;
      case metrics.centimeter:
        res.metre = +value / 100
        res.kilometer = +value / 100000
        res.centimeter = +value
        res.ft = +value / 30.48
        res.mile = +value / 160934
        res.inch = +value / 2.54
        break;
      case metrics.ft:
        res.metre = +value / 3.281
        res.kilometer = +value / 3281
        res.centimeter = +value * 30.48
        res.ft = +value
        res.mile = +value / 5280
        res.inch = +value * 12
        break;
      case metrics.mile:
        res.metre = +value * 1609
        res.kilometer = +value * 1.609
        res.centimeter = +value * 160934
        res.ft = +value * 5280
        res.mile = +value
        res.inch = +value * 63360
        break;
      case metrics.inch:
        res.metre = +value / 39.37
        res.kilometer = +value / 39370
        res.centimeter = +value * 2.54
        res.ft = +value / 12
        res.mile = +value / 63360
        res.inch = +value
        break;
    }

    res.centimeter = +res.centimeter.toFixed(2)
    res.metre = +res.metre.toFixed(2)
    res.kilometer = +res.kilometer.toFixed(2)
    res.inch = +res.inch.toFixed(2)
    res.mile = +res.mile.toFixed(2)
    res.ft = +res.ft.toFixed(2)

    return res
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput style={ styles.input } placeholder={lang[selectedLanguage].input}
        value={value}
        keyboardType="numeric"
        onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => 
          setValue(text.nativeEvent.text)} />

      <View style={styles.rowContainer}>
        <View style={styles.metricsColumn}>
          <Text style={styles.title}>{lang[selectedLanguage].metre + ' : ' + calculate().metre}</Text>
          <Text style={styles.title}>{lang[selectedLanguage].kilometer + ' : ' + calculate().kilometer}</Text>
          <Text style={styles.title}>{lang[selectedLanguage].centimeter + ' : ' + calculate().centimeter}</Text>
        </View>
        <View style={styles.metricsColumn}>
          <Text style={styles.title}>{lang[selectedLanguage].ft + ' : ' + calculate().ft}</Text>
          <Text style={styles.title}>{lang[selectedLanguage].mile + ' : ' + calculate().mile}</Text>
          <Text style={styles.title}>{lang[selectedLanguage].inch + ' : ' + calculate().inch}</Text>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <Picker
          style={{width: '50%'}}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Русский" value="ru" />
          <Picker.Item label="English" value="en" />
        </Picker>

        <Picker
          style={{width: '50%'}}
          selectedValue={metric}
          onValueChange={(itemValue, itemIndex) =>
            setMetric(itemValue)
          }>
          <Picker.Item label={lang[selectedLanguage].metre} value={metrics.metre} />
          <Picker.Item label={lang[selectedLanguage].kilometer} value={metrics.kilometer} />
          <Picker.Item label={lang[selectedLanguage].centimeter} value={metrics.centimeter} />
          <Picker.Item label={lang[selectedLanguage].ft} value={metrics.ft} />
          <Picker.Item label={lang[selectedLanguage].mile} value={metrics.mile} />
          <Picker.Item label={lang[selectedLanguage].inch} value={metrics.inch} />
        </Picker>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  metricsColumn: {
    width: '50%',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 18,
    fontWeight: '300',
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
