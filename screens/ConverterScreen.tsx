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

  return (
    <ScrollView style={styles.container}>
      <TextInput style={ styles.input } placeholder={lang[selectedLanguage].input}
        value={value}
        keyboardType="numeric"
        onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => 
          setValue(text.nativeEvent.text)} />

      <View style={styles.rowContainer}>
        <View style={styles.metricsColumn}>
          <Text style={styles.title}>{lang[selectedLanguage].metre}</Text>
          <Text style={styles.title}>{lang[selectedLanguage].kilometer}</Text>
          <Text style={styles.title}>{lang[selectedLanguage].centimeter}</Text>
        </View>
        <View style={styles.metricsColumn}>
          <Text style={styles.title}>{lang[selectedLanguage].ft}</Text>
          <Text style={styles.title}>{lang[selectedLanguage].mile}</Text>
          <Text style={styles.title}>{lang[selectedLanguage].inch}</Text>
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
