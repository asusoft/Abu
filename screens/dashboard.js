import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, FlatList, Platform, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import colours from '../Colors';
import Fire from '../Fire';
import ScheduleList from '../components/ScheduleList';
import tempData from '../tempData';

import { FontAwesome5, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

export default class Dashboard extends React.Component {
  render() {
    const Badge = ({count})=>(
      <View style={[
        styles.circle,
        {  
        borderColor: count < 1 ? colours.gray : 'blue'
        }
    ]}>
        
        <Text style={[
        styles.cont,
        {  
        color: count < 1 ? colours.gray : colours.blue
        }
    ]}>{count}</Text>
        </View>
    );
  return (
    <View style={styles.container}>
      <View style={styles.count}>
        <TouchableOpacity>
          <View style={styles.classes}>
            <AntDesign name="book" size={25} color='#14b98b' />
            <Badge count={4}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.classes}>
          <FontAwesome5 name="tasks" size={25} color='#14b98b' />
            <Badge count={0}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.classes}>
            <AntDesign name="book" size={25} color='#14b98b' />
            <Badge count={10}/>
          </View>
        </TouchableOpacity>

      </View>

      <View style={styles.header}>
        <Text>Today - Thursday, November 5</Text>
      </View>
      
        {4 < 1 ? 
        <View style={styles.noSchedule}>
          <MaterialCommunityIcons name="calendar-blank" size={60} color='#DCDCDC' />
          <Text style={styles.noText}>NO SCHEDULE TODAY</Text> 
        </View>
          :
          <FlatList
              style={styles.scrollContainer}
              data={tempData}
              keyExtractor={item => item.name}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <ScheduleList schedule={item} />}
              keyboardShouldPersistTaps="always"
          />}
       
  </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    marginBottom: 10,
    backgroundColor: '#fafafa',
},
  count: {
    flexDirection: 'row',
    height: 45,
    width: '100%',
    alignItems: 'flex-start',
    paddingStart: 10,
    paddingTop: 10,
    justifyContent: 'space-around'

  },
  circle:{
    width:22,
    height:22,
    borderRadius:11,   //half radius will make it cirlce,
    backgroundColor:colours.white,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 2,
    marginStart:4,
  },
  cont:{
    paddingTop:  Platform.OS === 'android' ? 0 : 2,
  },
  classes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  header: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    justifyContent: "flex-start",
    alignItems: "center",
    paddingStart:10,
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

  noSchedule: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '50%',
  },
  noText: {
    color: '#DCDCDC',
    fontWeight: '300',
    fontSize: 20
  },
  list: {
    backgroundColor: '#fafafa',
    marginBottom: 10
  },
  footer: {
    backgroundColor: colours.blue
  }
});