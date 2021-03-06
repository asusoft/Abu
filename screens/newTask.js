import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const newTask = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Text>cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => alert("TASK ADDED")}
                
            >
                <Text>Save</Text>
            </TouchableOpacity>
            <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
            <Text style={{color: colors.text}}>NEW TASK SCREEN</Text>
        </View>
    );
};

export default newTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    width: '100%',
    height: 10,
    flexDirection: 'row',
    backgroundColor: 'green',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});