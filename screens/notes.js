import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-navigation";
import firebase from 'firebase';
import FirebaseKeys from '../config';

const Notes = () => {
    let today = new Date().toDateString().replace(/ /g,' ')
    let now = new Date().toLocaleTimeString()
    class Fire {
        constructor() {
          firebase.initializeApp(FirebaseKeys);
        }
        gettimestamp() {
            return Date.now();
        }
    }
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleSelect = (time) => {
    console.warn("A time has been picked: ", time);
    hideTimePicker();
  };

  return (
      <SafeAreaView>
        <View>
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        </View>
        <View>
        <Button title="Show Time Picker" onPress={showTimePicker} />
        <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleSelect}
            onCancel={hideTimePicker}
        />
        </View>
        <View>
            <Text>{today}</Text>
        </View>
        <View>
            <Text>{now}</Text>
        </View>
        
      </SafeAreaView>
  );
};

export default Notes;