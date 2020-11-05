import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colours from "../Colors";
import tempData from "../tempData";

export default class AddCourseModal extends React.Component {
    backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];

    state = {
        name: "",
        color: this.backgroundColors[0]
    };

    createCourse = () => {
        const { name, color } = this.state;

        const course = { name, color };

        this.props.addCourse(course);

        this.setState({ name: "" });
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
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={{ position: "absolute", top: 64, right: 32 }} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colours.black} />
                </TouchableOpacity>

                <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                    <Text style={styles.title}>Create Course List</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Course Name"
                        onChangeText={text => this.setState({ name: text })}
                    />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
                        {this.renderColors()}
                    </View>

                    <TouchableOpacity
                        style={[styles.create, { backgroundColor: this.state.color }]}
                        onPress={this.createCourse}
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
