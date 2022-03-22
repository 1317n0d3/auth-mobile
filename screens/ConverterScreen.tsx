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
    },
    en: {
      metre: 'metre',
      kilometer: 'kilometer',
      centimeter: 'centimeter',
      ft: 'ft',
      mile: 'mile',
      inch: 'inch',
    },
  }

  const [selectedLanguage, setSelectedLanguage] = useState<string>('ru'),
    [metric, setMetric] = useState<string>(metrics.metre);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Русский" value="ru" />
        <Picker.Item label="English" value="en" />
      </Picker>

      <RadioButton.Item
        label={lang[selectedLanguage].metre}
        color='#194bff'
        value="male"
        status={ metric === metrics.metre ? 'checked' : 'unchecked' }
        onPress={() => {
          setMetric(metrics.metre)
        }}
      />
      <RadioButton.Item
        label={lang[selectedLanguage].kilometer}
        color='#194bff'
        value="male"
        status={ metric === metrics.kilometer ? 'checked' : 'unchecked' }
        onPress={() => {
          setMetric(metrics.kilometer)
        }}
      />
      <RadioButton.Item
        label={lang[selectedLanguage].centimeter}
        color='#194bff'
        value="male"
        status={ metric === metrics.centimeter ? 'checked' : 'unchecked' }
        onPress={() => {
          setMetric(metrics.centimeter)
        }}
      />
      <RadioButton.Item
        label={lang[selectedLanguage].ft}
        color='#194bff'
        value="male"
        status={ metric === metrics.ft ? 'checked' : 'unchecked' }
        onPress={() => {
          setMetric(metrics.ft)
        }}
      />
      <RadioButton.Item
        label={lang[selectedLanguage].mile}
        color='#194bff'
        value="male"
        status={ metric === metrics.mile ? 'checked' : 'unchecked' }
        onPress={() => {
          setMetric(metrics.mile)
        }}
      />
      <RadioButton.Item
        label={lang[selectedLanguage].inch}
        color='#194bff'
        value="male"
        status={ metric === metrics.inch ? 'checked' : 'unchecked' }
        onPress={() => {
          setMetric(metrics.inch)
        }}
      />
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
