import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


const taskDetails = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      <View style={styles.container}>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Text>Go back to Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push("editTask")}
          >
            <Text>Edit Task</Text>
          </TouchableOpacity>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <Text style={{color: colors.text}}>TASK DETAILS SCREEN</Text>
      </View>
    );
};

export default taskDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});