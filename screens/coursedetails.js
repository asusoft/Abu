import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


const courseDetails = ({ navigation, route }) => {

  const { colors } = useTheme();

  const theme = useTheme();

  
  
    return (
      <View style={styles.container}>

{route.params.name && <Text>{route.params.name}</Text>}
        <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Text>Go back to Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push("editCourse")}
          >
            <Text>Edit Course</Text>
          </TouchableOpacity>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <Text style={{color: colors.text}}>Course DETAILS SCREEN</Text>
      </View>
    );
};

export default courseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});