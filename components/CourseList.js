import React from "react";
import { StyleSheet, Text, View,TouchableOpacity, Modal } from "react-native";
import  colours from '../Colors';
import SubModal from './SubModals';

export default class CourseList extends React.Component {
    state = {
        showSubVisible: false
    };

    toggleSubModal() {
        this.setState({ showSubVisible: !this.state.showSubVisible });
    }

    render() {
        const course = this.props.course;

        const completedCount = course.subs.filter(sub => sub.completed).length;
        const remainingCount = course.subs.length - completedCount;

        return (
            <View>
                <Modal
                    animationType="slide"
                    visible={this.state.showSubVisible}
                    onRequestClose={() => this.toggleSubModal()}
                >
                    <SubModal
                        course={course}
                        closeModal={() => this.toggleSubModal()}
                        updateCourse={this.props.updateCourse}
                    />
                </Modal>
                <View style={[styles.listContainer, {borderLeftWidth: 10}, {borderLeftColor: course.color}]}>
            
                    <TouchableOpacity
                        onPress={() => this.toggleSubModal()}
                    >
                        <Text style={styles.noteText} numberOfLines={1}>
                            {course.name}
                        </Text>
                        <Text style={styles.subtitle} numberOfLines={1}>
                        {remainingCount} Sub class(es)
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
listContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 5,
    width: '100%',
    height: 60,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
},
noteText: {
    fontSize: 18,
    fontWeight: "400",
    color: 'black'
    
},
subtitle: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: "200",
    color: 'black'
},
});