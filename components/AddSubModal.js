import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput,
    Keyboard, } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colours from "../Colors";

export default class AddSubModal extends React.Component {
    backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];

    state = {
        newSub: "",
        subType: "",
        color: this.backgroundColors[0],
        addSubVisible: false,
    };

    addSub = () => {
        let course = this.props.course;
        let updateCourse = this.props.updateCourse;
        course.subs.push({ title: this.state.newSub, type: this.state.subType, color: this.state.color });

        updateCourse(course);
        this.setState({ newSub: "" });
        this.setState({ subType: "" });
        this.setState({ color: "" });

        Keyboard.dismiss();
        this.props.closeModal();
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
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={{ position: "absolute", top: 64, right: 32 }} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colours.black} />
                </TouchableOpacity>

                <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                    <Text style={styles.title}>New Topic</Text>

                    <TextInput
                            style={[styles.input, { borderColor: colours.blue }]}
                            onChangeText={text => this.setState({ newSub: text })}
                            value={this.state.newSub}
                            placeholder="Sub Class"
                        />
                    <TextInput
                            style={[styles.input, { borderColor: colours.blue }]}
                            onChangeText={text => this.setState({ subType: text })}
                            value={this.state.subType}
                            placeholder="Module"
                        />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
                        {this.renderColors()}
                    </View>

                    <TouchableOpacity
                        style={[styles.create, { backgroundColor: this.state.color }]}
                        onPress={this.addSub}
                    >
                        <Text style={{ color: colours.white, fontWeight: "600" }}>Create</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colours.black,
        alignSelf: "center",
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colours.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
});
