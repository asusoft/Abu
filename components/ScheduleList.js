import React from "react";
import { StyleSheet, Text, View,TouchableOpacity, Modal } from "react-native";
import  colours from '../Colors';
import SubModal from './SubModals';

export default ScheduleList = ({ schedule }) => {
    return (
            <View>
                <TouchableOpacity
                    >
                    <View style={[styles.listContainer, {borderLeftWidth: 4}, {borderLeftColor: schedule.color}]}>
                        {schedule.once ? 
                        <View style={styles.time}>
                            <Text style={styles.timeText}>{schedule.stime}</Text>
                            <Text style={styles.timeText}>{schedule.etime}</Text>
                        </View>
                        :
                        <View style={styles.time}>
                            <Text style={styles.timeText}>{schedule.rstime}</Text>
                            <Text style={styles.timeText}>{schedule.retime}</Text>
                        </View>
                        }
                        <View style={styles.title}>
                            <Text style={styles.noteText} numberOfLines={1}>
                                {schedule.name}
                            </Text>
                            <Text style={styles.subtitle} numberOfLines={1}>
                                {schedule.type}
                            </Text>
                        </View>
                        {schedule.once ? 
                        <View style={styles.day}>
                            <Text style={styles.subtitle} numberOfLines={1}>
                                {schedule.date}
                            </Text>
                            <Text style={styles.subtitle} numberOfLines={1}>
                                {schedule.teacher}
                            </Text>
                        </View>
                        :
                        <View style={styles.day}>
                            <Text style={styles.subtitle} numberOfLines={1}>
                                {schedule.day}
                            </Text>
                            <Text style={styles.subtitle} numberOfLines={1}>
                                {schedule.teacher}
                            </Text>
                        </View>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        );
}
            
                    

const styles = StyleSheet.create({
listContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
    width: '100%',
    height: 65,
    marginStart: 2,
    marginEnd: 2,
    backgroundColor: 'white',
    

},
noteText: {
    fontSize: 18,
    fontWeight: "400",
    color: 'black'
    
},
subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: colours.gray,
},
time: {
    alignSelf: 'center',
    flexDirection: 'column',
},
timeText: {
    fontSize:14,
    color: colours.gray,
},
title: {
    flexDirection: 'column',
    marginStart: 12,
    alignSelf: 'center'
},
day: {
    flexDirection: 'column',
    position: 'absolute',
    right: 20,
    alignSelf: 'center'
}
});