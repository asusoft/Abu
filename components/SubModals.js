import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Modal,
    Keyboard,
    Animated
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colours from "../Colors";
import { Swipeable } from "react-native-gesture-handler";
import AddSubModal from '../components/AddSubModal';
import * as Animatable from 'react-native-animatable';

import SubList from '../components/SubList';

export default class SubModal extends React.Component {
    backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];

    state = {
        newSub: "",
        subType: "",
        addSubVisible: false,
    };

    toggleSubCompleted = index => {
        let course = this.props.course;
        course.subs[index].completed = !course.subs[index].completed;

        this.props.updateCourse(course);
    };

    toggleAddSubModal() {
        this.setState({ addSubVisible: !this.state.addSubVisible });
    };


    deleteSub = index => {
        let course = this.props.course;
        course.subs.splice(index, 1);

        this.props.updateCourse(course);
        
    };

    renderSub = (sub, index, course) => {
        return  <SubList course={course} sub={sub} index={index} updateCourse={this.updateCourse} deleteSub={this.deleteSub}/>;
    };

    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, { backgroundColor: color }]}
                    onPress={() => this.setState({ color })}
                />
            );
        });
    }

    render() {
        const course = this.props.course;
        const updateCourse = this.props.updateCourse;

        const taskCount = course.subs.length;
        const completedCount = course.subs.filter(sub => sub.completed).length;

        return (
            <View style={[styles.container, { backgroundColor: course.color }]}>
                    <StatusBar backgroundColor='colours.black' barStyle="light-content"/>
                <View style={styles.header}>
                    <Text style={styles.text_header}>{course.name}</Text>
                    <Text style={styles.taskCount}>
                    You have {taskCount} sub classes
                    </Text>
                </View>
                <TouchableOpacity
                                style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
                                onPress={this.props.closeModal}
                            >
                                <AntDesign name="close" size={24}  />
                </TouchableOpacity>
                <Animatable.View 
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: colours.white
                    }]}
                >
                    <View style={styles.action}>
                        <Modal
                            animationType="slide"
                            visible={this.state.addSubVisible}
                            onRequestClose={() => this.toggleAddSubModal()}
                            >
                                <AddSubModal closeModal={() => this.toggleAddSubModal()} course={course} updateCourse={updateCourse}/>
                            </Modal>
                            
                        <FlatList
                            data={course.subs}
                            renderItem={({ item, index }) => this.renderSub(item, index)}
                            keyExtractor={(_, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                        
                    </View>
                        <View style={styles.addButton}>
                            <View style={{ marginVertical: 48 }}>
                                <TouchableOpacity style={[styles.addList, {borderColor: course.color}, {backgroundColor: course.color}]} onPress={() => this.toggleAddSubModal()}>
                                    <AntDesign name="plus" size={20} color={colours.white} />
                                </TouchableOpacity>
                            </View>
                        </View>
                </Animatable.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
container: {
flex: 1, 

},
header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
},
footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
},
text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
},
text_footer: {
    color: '#05375a',
    fontSize: 18
},
action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
},
        
subtitle: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: "200",
    color: 'black'
},
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colours.gray,
        fontWeight: "600"
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },

    addList: {
        borderWidth: 2,
        backgroundColor: '#14b98b',
        borderColor: '#14b98b',
        width: 60,
        height: 60,
        borderRadius: 50,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
});