import React from "react";
import { StyleSheet, Text, View,TouchableOpacity, Modal } from "react-native";
import  colours from '../Colors';
import ClassModal from './ClassModal';
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default class SubList extends React.Component {
    state = {
        showClassVisible: false
    };

    toggleClassModal() {
        this.setState({ showClassVisible: !this.state.showClassVisible });
    }

    render() {
        const sub = this.props.sub;
        const course = this.props.course;
        const index = this.props.index;
        const updateCourse = this.props.updateCourse
        
        const deleteSub = this.props.deleteSub
    
    return (
        <View>
            <Modal
                    animationType="slide"
                    visible={this.state.showClassVisible}
                    onRequestClose={() => this.toggleClassModal()}
                >
                    <ClassModal 
                    sub={sub} 
                    deleteSub={deleteSub}
                    updateCourse={() => this.updateCourse()}
                    course={course}
                    index={index}
                    closeModal={() => this.toggleClassModal()} />
                </Modal>
                <TouchableOpacity
                        onPress={() => this.toggleClassModal()}
                    >
                    <View style={[styles.action, {borderLeftWidth: 2}, {borderLeftColor: sub.color}]}>
                        
                        <Text style={[styles.textInput, {
                                color: colours.black
                            }]}>
                            {sub.title}
                        </Text>
                        <Text
                            style={[styles.subtitle, {
                                color: colours.black
                            }]}
                        >
                            {sub.type}
                        </Text>
                        
                    </View>
            </TouchableOpacity>
        </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
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
        paddingBottom: 5,
        height: 43,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
        fontSize: 15,
        fontWeight: "300"
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    subtitle: {
        marginTop: 2,
        fontSize: 10,
        fontWeight: "200",
        color: 'black',
        paddingLeft:10
    },
  });
